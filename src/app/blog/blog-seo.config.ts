import { PageSEO } from '@core/services/seo.service';
import { minimalnyi_rozmir_pensii_za_vikom_umovy_osoblyvosti } from './blog-posts/posts/minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti.seo';
import { khto_maie_pravo_na_pensiiu_za_vikom_u_2025 } from './blog-posts/posts/khto-maie-pravo-na-pensiiu-za-vikom-u-2025.seo';
import { komu_pererakhuiut_pensii_1_kvitnia_2025 } from './blog-posts/posts/komu-pererakhuiut-pensii-1-kvitnia-2025.seo';
import { yaka_maksymalna_pensiia_u_2025 } from './blog-posts/posts/yaka-maksymalna-pensiia-u-2025.seo';

export const BLOG_SEO_DATA: { [key: string]: PageSEO } = {
  ...minimalnyi_rozmir_pensii_za_vikom_umovy_osoblyvosti,
  ...khto_maie_pravo_na_pensiiu_za_vikom_u_2025,
  ...komu_pererakhuiut_pensii_1_kvitnia_2025,
  ...yaka_maksymalna_pensiia_u_2025,
};
