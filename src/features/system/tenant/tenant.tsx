import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/components/layout';
import { Submenu } from '@/components/layout/page/submenu';
import { Topbar } from '@/components/layout/page/topbar';

export const Tenant = () => {
  const title = 'Tenant Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  const topBarExtras = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconFilter' />
    </button>
  ];

  return (
    <Page
      layout
      navbar
      topbar={<Topbar title={title} operators={topBarOperators} extras={topBarExtras} />}
      submenu={<Submenu />}
    >
      <div id='lipsum'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed ligula dictum,
          porttitor turpis at, varius lacus. Morbi nec risus finibus, vulputate leo ac, ultricies
          nulla. Donec nec nunc tellus. Donec lacus sapien, feugiat vel lectus quis, rutrum aliquet
          ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor justo nec
          faucibus scelerisque. Sed facilisis tempus diam, nec porta lorem dignissim non. Nam ac est
          non sapien elementum iaculis.
        </p>
        <p>
          Sed a lacinia mauris. Nulla laoreet enim quis viverra porta. Suspendisse eget lacus et
          erat pretium tristique a et diam. Sed at condimentum dolor. Sed eu magna a velit luctus
          gravida et at ligula. Mauris placerat fringilla turpis, et tempor lorem. Mauris in justo
          fringilla, tincidunt leo consectetur, fringilla enim. Integer scelerisque interdum elit
          non viverra. Etiam sollicitudin ultrices dui vel commodo. Fusce a ligula dignissim felis
          pharetra laoreet. Maecenas aliquam pharetra quam, ac tristique mauris iaculis ac.
          Vestibulum feugiat sit amet lacus ac sagittis. Curabitur nec commodo enim. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent eu
          eros ex.
        </p>
        <p>
          Pellentesque a pulvinar felis, nec feugiat neque. Cras elit est, egestas at feugiat ut,
          posuere at erat. Mauris eleifend ex et tortor venenatis bibendum. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Fusce finibus, mauris ac scelerisque sodales,
          magna orci mattis metus, eget volutpat nulla purus non ante. Pellentesque aliquam dui non
          metus gravida, sed varius orci egestas. Suspendisse vel arcu a orci cursus pretium.
        </p>
        <p>
          Fusce in faucibus mauris. Maecenas tincidunt ante vitae maximus interdum. Praesent
          tincidunt sapien id pulvinar mattis. Proin porta ultrices mollis. Fusce egestas arcu ac
          purus feugiat, elementum mattis lorem tincidunt. Vestibulum in orci hendrerit tellus
          interdum ultrices sed eget nisi. Morbi pretium elit vitae sagittis viverra.
        </p>
        <p>
          Vestibulum nec turpis sed mi sollicitudin vestibulum sed ac massa. Aliquam bibendum sit
          amet sem in aliquam. Sed ut mi sodales, convallis nisl sed, faucibus est. Nullam eu
          viverra eros, quis luctus tortor. Aliquam elementum imperdiet purus. Mauris vitae aliquam
          libero. Donec condimentum non ex at mattis. Quisque mattis tristique molestie. Sed vitae
          est dapibus, luctus arcu at, tincidunt tortor. Integer vestibulum urna at ultricies
          aliquam. Nulla efficitur egestas faucibus. Curabitur tincidunt velit eu pellentesque
          porttitor.
        </p>
        <p>
          Integer euismod dolor vitae erat finibus venenatis ac id leo. Donec a dolor in felis
          fringilla semper. Donec non nibh sit amet diam hendrerit placerat. Aliquam tincidunt ante
          vel sem rutrum, et rutrum sapien vestibulum. Suspendisse sollicitudin ultrices ipsum
          maximus porta. Ut posuere nisi vel enim euismod finibus. Donec pulvinar auctor sapien, a
          tincidunt libero commodo vitae. Ut mattis tellus ligula, sed ornare ex lobortis quis.
          Integer ac erat ex. Nunc et commodo augue. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Vivamus efficitur nulla ut metus accumsan
          venenatis. Ut tempor ut quam et efficitur.
        </p>
        <p>
          Duis ut leo non felis venenatis aliquet. In hac habitasse platea dictumst. Nunc non ex id
          enim tempus lacinia. Phasellus sit amet mi lobortis, ornare purus laoreet, lobortis
          tortor. Mauris in nibh at dui laoreet auctor. Maecenas id est eu leo elementum
          condimentum. Nam fermentum, elit vitae ultricies aliquet, odio erat aliquet nulla, ac
          tempus sem quam non ipsum. Nulla placerat in tellus ut sagittis. Proin at velit semper,
          aliquam libero a, tristique dolor. Vivamus fermentum lectus nunc, sed vestibulum turpis
          scelerisque ac.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Sed dapibus tincidunt diam id vestibulum. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Donec quis dolor tellus. Morbi viverra, urna id
          hendrerit vulputate, enim urna molestie magna, sed sollicitudin ante nibh in erat. Morbi
          ut consequat libero. Nullam consectetur quam nec diam vehicula molestie. Morbi volutpat,
          orci sit amet bibendum iaculis, velit nisi tincidunt orci, ac consectetur nulla purus vel
          nisl. Sed convallis leo leo, quis tempus ligula rutrum ac. Integer dignissim posuere felis
          a laoreet. Aenean aliquet sodales sapien, nec pulvinar lorem bibendum eu. Praesent metus
          nulla, varius at metus in, sagittis tincidunt erat. Proin aliquam nisi rhoncus,
          scelerisque est vitae, vulputate risus.
        </p>
        <p>
          Vestibulum faucibus malesuada orci in facilisis. Morbi efficitur blandit lacus egestas
          molestie. Ut vestibulum porttitor viverra. Nam vulputate, arcu ac consequat consectetur,
          velit quam viverra massa, non fermentum sem justo eu elit. Integer suscipit nulla ut risus
          porttitor dapibus. Sed tempor eros magna, quis accumsan orci interdum in. Nulla a interdum
          purus, ut commodo tellus. Duis sed interdum leo, vitae eleifend lectus. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut condimentum
          auctor felis, non varius libero vulputate ut. Fusce aliquam sem metus, et blandit nisi
          vehicula ut. Etiam eleifend elit ut orci suscipit, quis molestie erat semper. Nullam
          lobortis quam est. Ut eget dictum purus, vel iaculis risus.
        </p>
        <p>
          Maecenas laoreet, diam ac sagittis euismod, dolor nisl tristique mi, fermentum ultrices
          lacus magna ut felis. Etiam congue arcu a enim pharetra vehicula. Quisque ipsum lorem,
          porta quis metus quis, pretium finibus neque. Mauris a ultrices ligula, ultricies lacinia
          dui. Ut aliquet ex et elit viverra interdum eget ut felis. Nulla et justo sed nisl tempus
          tempor nec in nisl. Maecenas in ultrices quam. Duis ac semper velit. Proin fringilla
          maximus ex, quis pharetra massa efficitur et. Fusce massa ligula, dapibus vitae massa sit
          amet, hendrerit gravida quam. Proin elementum aliquet turpis sit amet semper. Nunc
          consectetur orci et ornare pharetra. Sed at iaculis erat, ut feugiat tortor. Nulla et
          consectetur elit.
        </p>
        <p>
          Morbi sit amet metus neque. Suspendisse volutpat velit vitae lectus consectetur, eu
          tristique quam sodales. Curabitur commodo nisi non velit suscipit, ut facilisis massa
          auctor. Ut nec semper eros. Nam nisi leo, efficitur quis dignissim a, fermentum id sem.
          Phasellus malesuada varius nulla. Curabitur id nisi velit. Ut cursus massa semper eros
          accumsan, nec tristique ipsum rhoncus. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Fusce egestas neque et lorem ullamcorper, eu
          bibendum arcu dignissim. Mauris sit amet posuere nisl. Ut tempor nec est vitae malesuada.
          Integer ac dapibus dolor. Nulla hendrerit vitae quam sed pellentesque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <p>
          Sed leo leo, convallis non placerat quis, faucibus sit amet lorem. Pellentesque sit amet
          eros eu sem dapibus porttitor vitae in nibh. Cras dui sapien, laoreet vitae mauris non,
          commodo ornare ligula. Nulla cursus purus quis nunc maximus, id sagittis nunc fermentum.
          Cras malesuada, nisi a blandit condimentum, purus dolor accumsan metus, et fringilla nunc
          nulla quis nulla. Sed aliquam vitae libero vel sollicitudin. Sed pharetra at odio sit amet
          facilisis. Nam eu justo at leo placerat commodo pretium ut lectus. Praesent aliquet urna
          egestas velit mollis pretium. Pellentesque risus justo, consectetur in placerat ut,
          gravida sit amet quam. Sed molestie purus fringilla elit tincidunt, sit amet placerat
          tellus consectetur. Mauris nec sapien eget odio porta hendrerit eu sit amet leo.
        </p>
        <p>
          Suspendisse et leo vehicula, dapibus turpis non, viverra mauris. Proin quis felis at arcu
          bibendum sollicitudin id vitae eros. Pellentesque erat mi, semper quis convallis at,
          ornare vitae lacus. Duis non egestas tortor, aliquet malesuada mauris. Ut consequat semper
          lectus condimentum accumsan. Mauris sed ante justo. Sed maximus ultrices ex, quis dictum
          nunc tempor non. Praesent egestas augue sit amet ligula mollis, efficitur elementum diam
          varius. Nulla bibendum id urna at dapibus. Fusce sollicitudin tellus at lacus efficitur
          condimentum.
        </p>
        <p>
          Aenean placerat tellus id nisl varius, in cursus ex tristique. Aliquam sit amet
          sollicitudin risus, nec sagittis risus. Nulla dignissim fringilla ante id feugiat. Proin
          egestas, justo non accumsan semper, risus quam iaculis libero, luctus suscipit nulla
          tellus non ipsum. Nulla odio diam, rhoncus et quam ac, placerat tempor tellus. Donec
          finibus mi vitae lorem venenatis tincidunt. Etiam lobortis, nisi egestas commodo feugiat,
          metus magna consequat nunc, at faucibus velit justo sed odio. Ut placerat felis bibendum
          risus pellentesque cursus.
        </p>
        <p>
          Maecenas ullamcorper id ante sit amet aliquam. Aenean mattis non lectus a faucibus. In non
          dictum lorem. Aliquam hendrerit lacus eget elementum tempor. Aliquam vitae ex nisi.
          Quisque eget fringilla odio. Pellentesque ut venenatis magna. Suspendisse eget enim et
          odio luctus lacinia quis eu libero. Etiam ut eros augue. Etiam volutpat volutpat libero,
          vel efficitur libero dapibus et. Morbi justo neque, congue sit amet mi eget, semper
          maximus ex. Donec a massa imperdiet ipsum pretium ultrices. Nunc ut faucibus tortor, vel
          accumsan felis. Integer molestie quis quam eget finibus. Aliquam non neque molestie,
          fringilla felis non, tempor lorem.
        </p>
        <p>
          Donec sed dignissim augue. Vivamus pharetra mi consequat leo tristique, vitae elementum
          dui consectetur. Nam id nisl nisl. Aenean vitae turpis pellentesque, commodo magna in,
          convallis elit. Vivamus suscipit mollis sollicitudin. Integer non tincidunt dui.
          Vestibulum at quam in sapien convallis elementum vel sed purus. Donec vulputate aliquet
          arcu vel elementum. Phasellus metus ligula, tempor in ultricies vel, iaculis ut justo.
        </p>
        <p>
          Phasellus sit amet vulputate ipsum. Aliquam blandit ligula ipsum, eget laoreet dui iaculis
          vitae. Morbi ac eleifend mauris, eu condimentum nulla. Donec efficitur mauris eu eros
          pellentesque, a mollis felis sollicitudin. Aliquam eu elit non mauris rutrum posuere sed
          id ipsum. Aliquam erat volutpat. Quisque interdum ante gravida, egestas massa non, maximus
          nulla. Nullam mauris felis, imperdiet at nisi eget, aliquet pellentesque sapien. Nunc ac
          pharetra sem, a aliquam arcu. Maecenas tincidunt efficitur libero, ut cursus risus luctus
          vitae. Nulla facilisis sodales tellus, a viverra urna ultrices at. Duis at sem vel risus
          maximus malesuada eget non leo. Aenean dapibus commodo pellentesque.
        </p>
        <p>
          Sed quis ultrices ligula. Donec dapibus tincidunt metus eget gravida. Nullam ac leo vel
          libero suscipit vulputate. Ut at mi sit amet erat consequat bibendum. Morbi eu dolor id
          velit finibus imperdiet. Vestibulum dapibus commodo porta. Duis et congue diam. Fusce
          vehicula mollis elit, a efficitur tortor pretium a. In at pharetra neque. Duis iaculis
          metus dui. Proin id eleifend nibh, sed condimentum erat. Donec urna tellus, convallis et
          urna sed, ultricies dignissim risus. Curabitur dignissim ullamcorper fermentum. Integer
          odio ante, feugiat et elementum volutpat, dignissim eu erat. Proin interdum nunc sit amet
          lacus semper, pretium molestie leo elementum.
        </p>
        <p>
          Nullam ac justo sed orci dapibus ultrices vitae ac sapien. Integer ultrices vulputate
          metus et pellentesque. Sed sit amet purus in nibh rutrum volutpat ac vitae massa. Donec
          vestibulum ac felis non placerat. Vivamus molestie tempus libero, eu eleifend augue
          dignissim ut. Proin congue metus eget gravida ullamcorper. Pellentesque egestas convallis
          congue. Vestibulum vestibulum dui non sapien vulputate, in convallis ex efficitur.
          Suspendisse condimentum augue id condimentum mollis. Duis maximus felis sem, at sodales
          ante ultrices vel. Mauris et varius sem.
        </p>
        <p>
          Sed tempus nibh laoreet neque mollis lacinia. Curabitur rutrum vestibulum augue nec
          vehicula. Quisque euismod nisi sem, vel semper massa tincidunt vitae. Donec eget tincidunt
          erat. Ut eu aliquam justo. Donec a viverra felis, id ullamcorper nisi. Sed condimentum
          fermentum porta. Sed a ipsum nisl. Cras velit leo, pellentesque at est a, scelerisque
          blandit mauris. Aliquam non nisl fringilla, commodo augue at, ultricies lorem. Fusce sit
          amet lorem sem.
        </p>
        <p>
          Ut nec interdum leo. Nunc felis justo, elementum nec faucibus tristique, rutrum eget
          velit. Proin tristique ex magna, sit amet venenatis justo luctus non. Sed ut maximus
          nulla. Praesent laoreet vel urna nec feugiat. Aenean ac porta augue, non condimentum
          neque. Ut sollicitudin arcu porta commodo tempus. Nulla viverra magna at felis luctus
          dictum. Nunc a sagittis massa. Phasellus dapibus ante eget massa porttitor, vel sagittis
          felis accumsan. Pellentesque sit amet gravida turpis, in fringilla massa.
        </p>
        <p>
          Praesent finibus sit amet dolor interdum dictum. Maecenas eget euismod tortor, sed
          interdum magna. Pellentesque eu venenatis libero. Mauris eget nulla eget arcu mollis
          laoreet eu eget enim. Nunc vestibulum quam sit amet arcu finibus, in ultrices risus
          rhoncus. Cras vel sollicitudin felis, quis aliquam risus. Suspendisse potenti. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean sed
          tempor nunc. Sed non dui urna. In nisi velit, feugiat sit amet pretium a, dictum quis
          mauris. Etiam laoreet ac mauris at vulputate. Donec ut libero vitae diam auctor tincidunt.
        </p>
        <p>
          Nunc ac justo suscipit, interdum lectus ut, vehicula dui. Nunc ut erat bibendum,
          sollicitudin nisi sed, porta mi. Sed id sem at erat imperdiet commodo et eget leo. Nam
          interdum, libero ac tincidunt elementum, dolor ipsum accumsan nisl, sit amet tincidunt
          erat nisi finibus tortor. Duis suscipit iaculis fermentum. Praesent consectetur sapien id
          enim congue dapibus. Phasellus euismod consectetur tellus vel consectetur. Morbi accumsan
          diam neque, at laoreet eros mattis at. Cras ac rutrum sapien, eu ultrices tortor. Praesent
          id ornare ex.
        </p>
        <p>
          Nullam consequat sit amet quam id porta. Curabitur et quam magna. Ut sit amet massa purus.
          Sed vitae suscipit neque, id faucibus est. Morbi bibendum enim et vulputate finibus. Nunc
          euismod, orci vitae tincidunt blandit, lorem nisi tincidunt est, id finibus dolor est quis
          urna. Sed ligula metus, scelerisque eu nunc nec, aliquet accumsan massa. Fusce nibh nunc,
          fringilla sed interdum ac, gravida id risus. Integer mattis ac ex id vulputate. Vestibulum
          varius felis ac pellentesque tempus. Integer ullamcorper aliquet luctus. Nullam viverra
          dictum scelerisque. Nunc et augue vel est accumsan malesuada quis sit amet est. Ut eu
          tellus volutpat, volutpat urna mollis, mattis velit. Quisque mollis sed urna et venenatis.
          Cras aliquet elementum orci, id accumsan purus tincidunt nec.
        </p>
        <p>
          Donec lectus turpis, tempor id ligula ut, scelerisque convallis urna. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur
          faucibus egestas turpis, ac efficitur est hendrerit sit amet. Phasellus nulla eros,
          laoreet nec quam quis, fringilla fringilla risus. Donec placerat ornare odio, vel
          fermentum sapien vehicula id. Etiam rhoncus ornare sem, eget sodales leo bibendum a.
          Vivamus a condimentum urna, a bibendum lorem. Mauris cursus, augue ut feugiat
          pellentesque, metus enim dapibus nibh, vitae pulvinar diam tortor et leo. Aliquam
          facilisis turpis risus, eget ullamcorper augue vulputate aliquam. Donec massa dui, congue
          in lacus a, interdum rhoncus nibh. Nunc mollis neque non tempor dignissim.
        </p>
        <p>
          Maecenas sed metus sed arcu ullamcorper convallis. Praesent quis nunc ac est tempus
          vestibulum. Praesent bibendum urna quis orci gravida, a ultrices libero semper. Praesent
          sit amet sapien neque. Praesent sit amet elit purus. Phasellus scelerisque nec felis vitae
          lacinia. Suspendisse mattis purus quis augue cursus porttitor. Sed ut pulvinar libero,
          quis pharetra arcu. Nunc et sollicitudin nibh. In in nibh vitae nunc vehicula accumsan in
          posuere erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p>
          Ut ex arcu, posuere at faucibus nec, tristique eu erat. Nam volutpat ultricies lectus. In
          iaculis urna ac turpis aliquam aliquam. Mauris semper sodales orci at vestibulum. Nam
          porttitor purus eget justo lacinia aliquam. Integer faucibus est sed egestas pulvinar.
          Curabitur lorem metus, fringilla at finibus ac, varius quis metus. Fusce sit amet tortor
          massa. Nulla blandit vulputate ipsum, nec gravida eros. Proin condimentum tellus nisi, ut
          varius lectus laoreet at. Aenean ullamcorper, magna at aliquet hendrerit, dolor metus
          fringilla lacus, vel vehicula metus leo vitae lacus. Mauris malesuada nibh ex, quis semper
          nunc sagittis eu. Phasellus pulvinar neque sit amet blandit auctor. Donec gravida luctus
          rutrum. Curabitur consectetur ut libero sed ornare. Duis ullamcorper tortor purus, et
          lobortis enim ornare viverra.
        </p>
        <p>
          Cras luctus tristique diam. Nunc vel dignissim purus. Integer pharetra, turpis a feugiat
          ornare, ipsum nulla iaculis est, quis tempor magna dolor nec arcu. Sed hendrerit leo quis
          viverra ornare. Mauris dapibus ante et libero luctus tempus. Nunc scelerisque egestas
          blandit. Duis ac nisl iaculis mi rutrum placerat rutrum at metus.
        </p>
        <p>
          Duis non elementum enim. Maecenas ligula tortor, porttitor sed dui sed, egestas elementum
          purus. Cras eget enim quis nisi interdum dictum. Nullam nibh purus, ultricies et rutrum a,
          maximus ut elit. Nulla facilisi. Nam posuere ornare lobortis. Curabitur blandit
          ullamcorper eros ut molestie.
        </p>
        <p>
          Aenean pellentesque sapien eget efficitur suscipit. Nulla sem neque, lacinia eu est ut,
          fermentum iaculis ipsum. Integer eget ex nulla. Etiam ac quam massa. Nunc mattis, enim et
          porta aliquam, ipsum diam condimentum justo, sed vestibulum ipsum nisi tristique est.
          Donec a sodales dolor, vel vulputate ligula. Aliquam eget nibh non augue feugiat congue.
          Nullam euismod odio et lorem ultrices, eget euismod tortor tincidunt. Integer imperdiet
          viverra nunc eget cursus. Mauris facilisis diam congue egestas sollicitudin. Fusce sit
          amet feugiat dui, id placerat nisi.
        </p>
      </div>
    </Page>
  );
};
