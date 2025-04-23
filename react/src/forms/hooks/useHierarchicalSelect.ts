import { useState, useCallback } from 'react';

import { useControlledState } from './useControlledState';
import { useHierarchicalData, HierarchicalNode } from './useHierarchicalData';

export interface HierarchicalSelectOptions {
  multiple?: boolean;
  allowParentSelection?: boolean;
}

export function useHierarchicalSelect<T = any>(
  nodes: HierarchicalNode<T>[],
  value: any | any[] | undefined,
  defaultValue: any | any[] = [],
  onChange?: (_value: any) => void,
  options: HierarchicalSelectOptions = {}
) {
  const { multiple = false, allowParentSelection = true } = options;

  // Initialize controlled state
  const [selectedValues, setSelectedValues] = useControlledState<any[]>(
    value === undefined
      ? undefined
      : multiple
        ? Array.isArray(value)
          ? value
          : [value]
        : Array.isArray(value)
          ? [value[0]]
          : [value],
    multiple
      ? Array.isArray(defaultValue)
        ? defaultValue
        : []
      : Array.isArray(defaultValue)
        ? [defaultValue[0]]
        : [defaultValue]
  );

  // Process hierarchical data
  const { flattenedNodes, nodesMap, parentChildMap } = useHierarchicalData(nodes);

  // Track expanded nodes state
  const [expandedNodes, setExpandedNodes] = useState(new Set<string | number>());

  // Get all descendant values for a node
  const getAllDescendantValues = useCallback(
    (nodeValue: string | number): (string | number)[] => {
      const descendants: (string | number)[] = [];
      const children = parentChildMap[nodeValue] || [];

      // Add direct children
      descendants.push(...children);

      // Add descendants recursively
      children.forEach(childValue => {
        descendants.push(...getAllDescendantValues(childValue));
      });

      return descendants;
    },
    [parentChildMap]
  );

  // Get all parent values for a node
  const getAllParentValues = useCallback(
    (nodeValue: string | number): (string | number)[] => {
      const parents: (string | number)[] = [];
      const currentNodeValue = nodeValue;
      let currentNode = nodesMap[currentNodeValue];

      while (currentNode && currentNode.parent !== null && currentNode.parent !== undefined) {
        parents.push(currentNode.parent);
        currentNode = nodesMap[currentNode.parent];
      }

      return parents;
    },
    [nodesMap]
  );

  // Check if all children of a node are selected
  const areAllChildrenSelected = useCallback(
    (nodeValue: string | number): boolean => {
      const children = parentChildMap[nodeValue] || [];
      if (children.length === 0) return false;

      // Check each child and its descendants
      return children.every(childValue => {
        const isChildSelected = selectedValues.includes(childValue);
        const hasGrandchildren = (parentChildMap[childValue] || []).length > 0;

        if (!isChildSelected && !hasGrandchildren) {
          return false;
        }

        if (hasGrandchildren) {
          return areAllChildrenSelected(childValue);
        }

        return true;
      });
    },
    [parentChildMap, selectedValues]
  );

  // Check if any children of a node are selected
  const areAnyChildrenSelected = useCallback(
    (nodeValue: string | number): boolean => {
      const children = parentChildMap[nodeValue] || [];
      if (children.length === 0) return false;

      // Check each child and its descendants
      return children.some(childValue => {
        const isChildSelected = selectedValues.includes(childValue);
        const hasGrandchildren = (parentChildMap[childValue] || []).length > 0;

        if (isChildSelected) {
          return true;
        }

        if (hasGrandchildren) {
          return areAnyChildrenSelected(childValue);
        }

        return false;
      });
    },
    [parentChildMap, selectedValues]
  );

  // Check for indeterminate state
  const getIndeterminateState = useCallback(
    (nodeValue: string | number): boolean => {
      return areAnyChildrenSelected(nodeValue) && !areAllChildrenSelected(nodeValue);
    },
    [areAnyChildrenSelected, areAllChildrenSelected]
  );

  // Toggle node expansion
  const toggleNodeExpansion = useCallback(
    (nodeValue: string | number, event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
      }
      setExpandedNodes(prev => {
        const newExpanded = new Set(prev);
        if (newExpanded.has(nodeValue)) {
          newExpanded.delete(nodeValue);
        } else {
          newExpanded.add(nodeValue);
        }
        return newExpanded;
      });
    },
    []
  );

  // Toggle selection of a node
  const toggleNodeSelection = useCallback(
    (nodeValue: string | number) => {
      let newValues = [...selectedValues];
      const isSelected = selectedValues.includes(nodeValue);
      const hasChildren = (parentChildMap[nodeValue] || []).length > 0;

      if (multiple) {
        if (isSelected) {
          // Deselect this node
          newValues = newValues.filter(v => v !== nodeValue);

          // If this is a parent, also deselect all descendants
          if (hasChildren) {
            const descendants = getAllDescendantValues(nodeValue);
            newValues = newValues.filter(v => !descendants.includes(v));
          }

          // Update parent nodes
          const parents = getAllParentValues(nodeValue);
          parents.forEach(parent => {
            if (newValues.includes(parent)) {
              newValues = newValues.filter(v => v !== parent);
            }
          });
        } else {
          // Select this node
          newValues.push(nodeValue);

          // If this is a parent and we're selecting all descendants
          if (hasChildren && !allowParentSelection) {
            const descendants = getAllDescendantValues(nodeValue);
            descendants.forEach(desc => {
              if (!newValues.includes(desc)) {
                newValues.push(desc);
              }
            });
          }

          // Check parent nodes - if all siblings are now selected, also select the parent
          const parents = getAllParentValues(nodeValue);
          parents.forEach(parent => {
            const children = parentChildMap[parent] || [];
            const allChildrenSelected = children.every(child => newValues.includes(child));

            if (allChildrenSelected && !newValues.includes(parent)) {
              newValues.push(parent);
            }
          });
        }
      } else {
        // Single selection mode
        newValues = [nodeValue];
      }

      // Update state and call onChange callback
      setSelectedValues(newValues);
      if (onChange) {
        onChange(multiple ? newValues : newValues[0]);
      }
    },
    [
      selectedValues,
      multiple,
      parentChildMap,
      getAllDescendantValues,
      getAllParentValues,
      allowParentSelection,
      onChange
    ]
  );

  // Get filtered selected values for display (avoid showing redundant parent-child selections)
  const getFilteredSelectedValues = useCallback(() => {
    if (!multiple) return selectedValues;

    return selectedValues.filter(value => {
      const hasChildren = (parentChildMap[value] || []).length > 0;

      if (hasChildren) {
        const allChildrenSelected = areAllChildrenSelected(value);

        if (allChildrenSelected) {
          // Don't show parent when all descendants are explicitly selected
          const descendants = getAllDescendantValues(value);
          const allDescendantsSelected = descendants.every(desc => selectedValues.includes(desc));
          return !allDescendantsSelected;
        }
      }

      return true;
    });
  }, [multiple, selectedValues, parentChildMap, areAllChildrenSelected, getAllDescendantValues]);

  // Get all nodes that should be visible based on expanded state and search term
  const getVisibleNodes = useCallback(
    (searchTerm = '') => {
      if (!searchTerm) {
        // Return nodes that should be visible based on expanded state
        return flattenedNodes.filter(node => {
          // Root nodes are always visible
          if (!node.parent) return true;

          // Check if all ancestor nodes are expanded
          let currentParent = node.parent;
          while (currentParent) {
            if (!expandedNodes.has(currentParent)) {
              return false;
            }
            currentParent = nodesMap[currentParent]?.parent;
          }
          return true;
        });
      }

      // Get all nodes that match the search term
      const matchingNodes = flattenedNodes.filter(node =>
        String(node.label).toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Include all parents of matching nodes to maintain hierarchy
      const nodesToShow = new Set(matchingNodes);
      matchingNodes.forEach(node => {
        let currentParent = node.parent;
        while (currentParent) {
          // Add parent to visible nodes
          const parentNode = nodesMap[currentParent];
          if (parentNode) {
            nodesToShow.add(parentNode);
            // Auto-expand parent
            setExpandedNodes(prev => {
              const newExpanded = new Set(prev);
              newExpanded.add(currentParent);
              return newExpanded;
            });
          }
          currentParent = parentNode?.parent;
        }
      });

      return Array.from(nodesToShow);
    },
    [flattenedNodes, expandedNodes, nodesMap]
  );

  return {
    // Values
    selectedValues,
    filteredSelectedValues: getFilteredSelectedValues(),
    expandedNodes,
    flattenedNodes,
    nodesMap,
    parentChildMap,
    rootNodes: flattenedNodes.filter(node => !node.parent),

    // Methods
    setSelectedValues,
    toggleNodeSelection,
    toggleNodeExpansion,
    getAllDescendantValues,
    getAllParentValues,
    areAllChildrenSelected,
    areAnyChildrenSelected,
    getIndeterminateState,
    getVisibleNodes,

    // Helper methods
    expandAllNodes: () => {
      const allNodeValues = flattenedNodes.map(node => node.value);
      setExpandedNodes(new Set(allNodeValues));
    },
    collapseAllNodes: () => {
      setExpandedNodes(new Set());
    },
    expandNodeAndParents: (nodeValue: string | number) => {
      setExpandedNodes(prev => {
        const newExpanded = new Set(prev);

        // Add this node
        newExpanded.add(nodeValue);

        // Add all parents
        let currentParent = nodesMap[nodeValue]?.parent;
        while (currentParent) {
          newExpanded.add(currentParent);
          currentParent = nodesMap[currentParent]?.parent;
        }

        return newExpanded;
      });
    }
  };
}
