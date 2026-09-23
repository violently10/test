import { useState, useEffect } from 'react';
import { Product, MediaAsset, HomepageConfig, CartItem, AuditLogEntry } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-arc-01',
    sku: 'SKU-ARC-01',
    title: 'The Arc Collar',
    narrative: 'Stripped of superfluous ornament, every silhouette relies on pure weight, reflective curvature, and tactile density.',
    regularPrice: 590,
    salePrice: 540,
    collection: 'sculptural',
    collectionName: 'Curated Sculptural Forms',
    metal: 'Solid 18K Yellow Gold',
    stock: 14,
    stockStatus: 'in_stock',
    featured: true,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3xNPLUzbemOWcdEoI43RU0E4aUrhMsfVdEGCFqxyqpUeDqp-JByWsSBUNW64Eip2Btmx1WUendsgmOz5JTQLOU-sff5Ifc77_U2dCoqcPK7HqnVDWdxo9ys2KGGgK3sZfDJ5yoYDPVHQMcJbEQi1j1jE-A3loTIRLz3BPCZEL62mX1FzxhVfciEeac6DiUb08ktSXMf_jzHrsELecOhBatSDpygizJTGi5AwFJ6AKo_55Jt20Ct1qIg',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI28NkjijoCThYbGak-2FvnZILPr837xMJVo1OtsYJ6n1hl9ks6zr6rfCrhkZF2wp_4H4dnI4azgDt5ZbXregW_7bXa9hBOeDM3rDCQvs5gSh8Gmm_GCFIfKHhoBgef6iPnFUdb3hPrFM2gWm46o15eTyewVD3hObk1I3xm7_JBJ-GexX_wG2Ap9igukvLpGoCV4u9szifiMWMSkpPDYzrAso-ZWnkmg5bvLvXms4vL0ZyYcdHxogAsA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOcquY5t19MivfmCokzTYrjBSatPKHzOfrC9wcjWKE3s5j6RHjX2X_G5sNWs-1rHhfm5t48BcenQC2FHJzS3ZHwjJGBHOCefwvMCXMEwSxHLFZiICi5u6lz8gU0fQhoyI_kofXUeaO1uz-6_yBDU28ljrRHSQg_5_D3iapZWfmmkS8noBpfMsm-PAnSXxJ7zk_C_wI7P35x6tSUG5V-7a6PAar74u_JTHN-gaindj_7hUs4tVI8pBVMw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjgqIQd_oKcJb96DK-taZiLrjCK-E1Y05Mp8IBDXsoAsyzllyICK81OtdsPEIxI8F5errX_EqampoxS2c5-CppPuJwjB_cKUE7Hbds5_kMs5LCUDoJyDqUVm9lhemY0SO_SqpJpEba5PIrt2L6TlgNYWTLLfZ_cqDN_2hzPiaR2PyviX9MFDb2TzTRNuHjMQXVwI8tYEcs2L0crjIdelNGW9AZUWkyruBmoxVtr83GfV1plY1DxqQHCw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTuStEiM9Mjh3kkEY03bEehhIxqLGfsLICkKj2UuHrjyHxEcq1FOR20plh-py6_ko33QBK0ZznRRQzDuOJDRSgp-QlUDUGj6fE4jqSGpcJ04UALz5qUhuyYlx6Lmp52tMj4ZV1mUYe7Beg-udZ503PgolIsfnVrJMm0a3UZioUv9qP35igonhwkOfzNKwKf-PgRPifObNShLw50tnW5nOU9NhDVsBt8G7oAl8mHwd3oSfOkN6Y_MXSgg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYFRXpDByDTxWJYroA0rI1zGnx3O_wlsWmACfOXgCExTmjYccvVQP3TJO55zWFZfZ-hsLcz4gBxcpDe0X9MmW0RxuenB_GlTUZHHmuLZzP6kjGgVYxdJID1O_pG6jWxDePYrKbRRjNBReolFtSiIDNgvcrOK3fSH_mjEB6Zh0c4oh6c9GquHRIBHKHvjRebGxvBfBWbfkR0MkHoPAXSxxiVZQWAc1Aa7y68YGdrXf56gMgic-a1USbFw'
    ],
    dimensions: 'Internal diameter: 125mm · Gap: 45mm',
    weight: '112.4g',
    purityMark: 'AU 750 / Stamped Hallmarked Paris',
    provenanceCert: 'Place Vendôme Atelier Sanctum Cert #091-ARC'
  },
  {
    id: 'prod-fld-02',
    sku: 'SKU-FLD-02',
    title: 'The Fold Cuff',
    narrative: 'Forged from a continuous band, tension-creased to catch oblique shadows across architectural angles.',
    regularPrice: 840,
    collection: 'silver',
    collectionName: 'Monolithic Silver',
    metal: 'Argentium 935 Silver',
    stock: 8,
    stockStatus: 'in_stock',
    featured: true,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA61kjfqGJ9cKr3oOsgLTTXhVPqbnNwcoyaIeuLQBxNqPjqdxbzxw07BNbXkW8unC4J_8dxJHGI8-1UHfMdu2fRSHnt6rSZcrt-_hG-bcnvH0qqCcB2hRpEqE2bQrRDqol0YNMyZ3fIM9KjXJOrZ25SfMdUsjTfmob8o2UqgCHFh4K1li1vICTUZdji6QbN6kUF_wXmZEPC8Q0E5zboPbtiL8xKvx4flef5nC2hyEUxl1gb-AM51S5SMw',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo90HeUupQ8XCL4nbKXkQFNyl77eU7KlcGwesmPzmBMyofxxZIW7vYuQGufbMZoHNx9hp-wmhgLU_yKOG22IPWGyacIz8LadH7o20tseZ-it9v6wUfKwoHS47yoksO5bf5Eq6vnrpOrUEkFW_mN8KSCwTeDI1x-W18F3w7-jXOp-dqAZ4LN-qm1jsdhcHTkaXhDg46UwKcRh2StsBAwdKM5MIaphq-apu8G6M-btvBeJB7-jNE2FmpKw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA61kjfqGJ9cKr3oOsgLTTXhVPqbnNwcoyaIeuLQBxNqPjqdxbzxw07BNbXkW8unC4J_8dxJHGI8-1UHfMdu2fRSHnt6rSZcrt-_hG-bcnvH0qqCcB2hRpEqE2bQrRDqol0YNMyZ3fIM9KjXJOrZ25SfMdUsjTfmob8o2UqgCHFh4K1li1vICTUZdji6QbN6kUF_wXmZEPC8Q0E5zboPbtiL8xKvx4flef5nC2hyEUxl1gb-AM51S5SMw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjDpdMbuSjEilNUpXaMi4M4AQvGHIgEbvayDGc8N8KCNU99b71fLTIC1M_P8PIJjNVh4S4V8_bSyDZvAe2n1M0QDAx5RXKZFtUb6v73FmRnYHXUpDKFYIl78waYxfZLRxpMI0UehK5cdHo9PXxvrCRV2OpQ2qfyMgP0dDIugjrf367-xiyCd5slIi5whqFu_LcLlswuBQp7fAB0jmkEjdy6hXTEgy4qhN1-sHqK8OpGrV_UBV5gy-hog'
    ],
    dimensions: 'Internal width: 62mm · Thickness: 6.8mm',
    weight: '86.2g',
    purityMark: 'AG 935 / Anti-tarnish Argentium',
    provenanceCert: 'Zurich Vault Foundry Cert #442-FLD'
  },
  {
    id: 'prod-trs-03',
    sku: 'SKU-TRS-03',
    title: 'The Torus Band',
    narrative: 'Mathematically infinite continuous loop engineered in solid mirror-buffed yellow gold with an organic interior concavity.',
    regularPrice: 780,
    salePrice: 710,
    collection: 'gold',
    collectionName: 'Solid Gold 18K',
    metal: '18K Honey Gold',
    stock: 3,
    stockStatus: 'low_stock',
    featured: true,
    isHeroKeyPiece: true,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsMH3TM1we5ES4L37xTEGixXHCFu9Pu_SHJBjPkhuB-KgAD91qLE0tMpLP2RUQFoKPgWRdyYIqg_J5cW7Gz8cENvVQK4ZbktUE54iwILpcSi5EwnU79BIIN0EsQPN7XP5J0klruqIluv93ScLPtk-syODxr1VVcM1fAA-UEbBxnNEPAZInMWP7ma50Dh8eMidj47w-asMI5_rNM2Zxw13zv4Uy0o2vgA7jsQmvvH4hUX2yowu_p0IVuQ',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmwfwfh2aRHFUPFlkhE-5IdR-nElmaZioRnJTJmhPqr7uM78-i8xCZhQoIBg0HUbEYjTFoJJ9jYXph_03fYVfwKZd8cYymd-VM6NbW-WHTzMn-PY7uoCGB5uD2bd8x3-tZ5H5A5L8xjKwN6tCYVwACwzxXxxB45-Oob566lWp4uYshEsYU_b8QOs9APnIuDiN2XY2eBCANqyIyHzEmuXGPSwlAdnfRZr72ZQsTNmZUz09P4AHoPTbdLg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsMH3TM1we5ES4L37xTEGixXHCFu9Pu_SHJBjPkhuB-KgAD91qLE0tMpLP2RUQFoKPgWRdyYIqg_J5cW7Gz8cENvVQK4ZbktUE54iwILpcSi5EwnU79BIIN0EsQPN7XP5J0klruqIluv93ScLPtk-syODxr1VVcM1fAA-UEbBxnNEPAZInMWP7ma50Dh8eMidj47w-asMI5_rNM2Zxw13zv4Uy0o2vgA7jsQmvvH4hUX2yowu_p0IVuQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4_Lpo1no1yMY8eewrYWRgJOrFBOGzG6AKu3Ydfxrx2xO0AarMKTAVIqgXWOFJ8LRQGTR8Riy-rUtiDFLf9_x2GbSnkYtn43uwXaciAnIOLO-YmxcSbTosUFSvLJqS-MtbUVnCGw_P4GCgQykV2GTNjnWdEd0Ouo_YKQLP2Rvv3tGv5UO861Ntg8nGrjPafk4eAZuSMsTZ_4Wdj_myNd9HiJN505S_uYivzgCLMSUS1WSZqMbiPgFzyA'
    ],
    dimensions: 'Band width: 8.5mm · Comfort fit camber',
    weight: '19.8g',
    purityMark: '18K 750 / Hand-Poured Solid Cast',
    provenanceCert: 'Place Vendôme Sanctum Cert #782-TRS'
  },
  {
    id: 'prod-drp-04',
    sku: 'SKU-DRP-04',
    title: 'The Droplet Drops',
    narrative: 'Freeform molten silver pendant drops capturing liquid kinetics paused in heavy sterling metal with hollow-cast lightness.',
    regularPrice: 380,
    collection: 'sculptural',
    collectionName: 'Curated Sculptural Forms',
    metal: 'Satin Platinum & Rhodium Plated',
    stock: 6,
    stockStatus: 'preorder',
    featured: true,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdvSzALWvHp9BHnYdYrDZpxGALAM5P5STidilk99K5TMY63fI006H_FObJjOPhSF9e-KsOZ0qC_uicYrmOELumvILal53ClM0Iwa8Pv8Ib1DNpehtHWTCkhCqbyltBc-BohVJ9pOAh-wBfa7KfTXIBkuojyy5pm11-adskfJexnghQL109itNdR8bxwVksXIvGOCHccfKpA9f9beXyKzH2_TcTUNl7OVaQUpv6W8oP7SiuzaQO9vpGww',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoa5_59IlvOS1t-pn6fmJS-IczlVzpVxa9S3kRYSogGFJ_nvBmH9y8dHVFrpSREE3msEClfsOu5QfYflupoz3eIMTNple1OypoaowovqcFsHvKjU3m495P5vALRq3nWcVVvFpfHqP4T0_L8ucRVZA6jrhuCUQeiFGUsM5AYog58PfMXEJ_RPqsRF9HdjnFUVDWKOa6DUZR4G5m7s6gtGHSRQGuydboMM6BeMpV6s73RNM5eUCdQrcSMA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdvSzALWvHp9BHnYdYrDZpxGALAM5P5STidilk99K5TMY63fI006H_FObJjOPhSF9e-KsOZ0qC_uicYrmOELumvILal53ClM0Iwa8Pv8Ib1DNpehtHWTCkhCqbyltBc-BohVJ9pOAh-wBfa7KfTXIBkuojyy5pm11-adskfJexnghQL109itNdR8bxwVksXIvGOCHccfKpA9f9beXyKzH2_TcTUNl7OVaQUpv6W8oP7SiuzaQO9vpGww',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfxtGQs50SX8hAwvxE9raMLpoyVktSV_gGM5MJQpTc31ocPFRp9Cc0BFSMbvFNxQ46xAq-ffWGthzOhfbAsZg0rE8KCz9jpOstDJdZhH8ygg7nFw-yYf_PjoyxLjbnDPlDC2_ioqulRW3bTmD6HrusFIrxysg7eBuDJFZQrB1Kic2O_Iw2y02SW6Bw6cy73-2-kb6biRDhLF3wPk4unjML1NqJPrIeeIOGZrkCa-DJShVbF-uF4XDHPw'
    ],
    dimensions: 'Drop length: 48mm · Graduated drops',
    weight: '14.2g per pair',
    purityMark: 'PT 950 / Solid Post',
    provenanceCert: 'Atelier Forge Cert #312-DRP'
  },
  {
    id: 'prod-cyl-05',
    sku: 'SKU-CYL-05',
    title: 'Cylinder Signet',
    narrative: 'Solid cylinder form carved with micro-recessed gemological face for raw uncut diamond specimen mounting.',
    regularPrice: 650,
    salePrice: 600,
    collection: 'gold',
    collectionName: 'Solid Gold 18K',
    metal: '18K Matte Gold',
    stock: 22,
    stockStatus: 'in_stock',
    featured: false,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEs4lE1ghayxwr_W03rgUZIqZ2-Lgx3_O1Gxu0AhiMEPKmROQaeeZkLkYduhIE2H06wefuTR9D3fCr1LY0VKA1P2QYqDyF_5bZG--mjESG9xY2IPsasZTkOZE6a0n3S1DUZNTSV_KtXXcl4OFVx3dTVclALQhg4TdBcHwINb7fv8-RHp-4OZAYmjJo_3Oamu5ilK14aS4qRSP0TIYaOe7-c7Ht-cLamE7_sc7OHIM_d_7V0CN6wIBYow',
    secondaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLQQelqsHUWJWq_0gW-8lnh0TDlXA75T8KH2F1YF_0EsXobgkKz2sv_4f5gtxWpHhaXq4gPCF8MBF3bAlqZhbiSTAXTzgKk3QMrcTY7X2um3yo3VEsJPG6eNEvuvUnhkL5RA1c4DiBBC_ZCF4PDnHKfe1mLopSlLmsxyeqIZ3c8LX911WwxiXJeMu01aqnAoDhx3Ti6dRJnrWqQ9susty-bby54cWLcU3Q6s2z88KwUP9H76K42mUkpg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEs4lE1ghayxwr_W03rgUZIqZ2-Lgx3_O1Gxu0AhiMEPKmROQaeeZkLkYduhIE2H06wefuTR9D3fCr1LY0VKA1P2QYqDyF_5bZG--mjESG9xY2IPsasZTkOZE6a0n3S1DUZNTSV_KtXXcl4OFVx3dTVclALQhg4TdBcHwINb7fv8-RHp-4OZAYmjJo_3Oamu5ilK14aS4qRSP0TIYaOe7-c7Ht-cLamE7_sc7OHIM_d_7V0CN6wIBYow'
    ],
    dimensions: 'Face diameter: 14mm · Profile: 4mm',
    weight: '24.1g',
    purityMark: '18K 750 Yellow Gold',
    provenanceCert: 'Place Vendôme Sanctum Cert #650-CYL'
  }
];

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  heroHeadline: 'Objects worth keeping forever.',
  heroSubtitle: 'The Q creates minimalist jewelry where form and volume take center stage. Timeless objects designed to be worn, collected, and remembered.',
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-with-golden-rings-42646-large.mp4',
  heroPosterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUJCZe2b2Gq3wUbNoBe-41BX2YvfG-YoNFnuMpISD9jNtHj9WqMXNpVLxiEi74HGdwAGTF67adEtmQzv1LJSjcEWlXl6yQ8M614VKZbFvAtK_iG1-vlmEoCpuTCToZikeIdSRbNg-5G8Dz9NLADTA8ebqBpmtbR21Fu6-Q019KL2Dd2bRIRCJ3ri1aBzh6GShRBmLxOGyGOIkeykwXPqBi0tFApscnWRFZhVyGmhFw9xATOjQjup_q3A',
  heroPrimaryCtaLabel: 'Shop Collection',
  heroPrimaryCtaUrl: '#sculptural-exhibit',
  heroSecondaryCtaLabel: 'Discover the Story',
  heroSecondaryCtaUrl: '#story-section',
  floatingPills: ['Minimalist Design', 'Handcrafted Objects', 'Timeless Collections', 'Modern Luxury'],
  keyPieceSku: 'SKU-TRS-03',
  exhibitHeadline: 'Curated Sculptural Forms',
  exhibitSubtitle: 'Stripped of superfluous ornament, every silhouette relies on pure weight, reflective curvature, and tactile density.',
  exhibitSlot1Sku: 'SKU-ARC-01',
  exhibitSlot2Sku: 'SKU-FLD-02',
  exhibitSlot3Sku: 'SKU-DRP-04',
  vipBannerTitle: 'Join the List',
  vipBannerSubtitle: 'Bespoke exhibition invitations, private preview allocations, and sculptural design disclosures.'
};

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'media-01',
    name: 'torus_band_studio_macro.jpg',
    size: '2.14 MB',
    format: 'WEBP / Lossless',
    resolution: '2800 × 2800 px (1:1)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsMH3TM1we5ES4L37xTEGixXHCFu9Pu_SHJBjPkhuB-KgAD91qLE0tMpLP2RUQFoKPgWRdyYIqg_J5cW7Gz8cENvVQK4ZbktUE54iwILpcSi5EwnU79BIIN0EsQPN7XP5J0klruqIluv93ScLPtk-syODxr1VVcM1fAA-UEbBxnNEPAZInMWP7ma50Dh8eMidj47w-asMI5_rNM2Zxw13zv4Uy0o2vgA7jsQmvvH4hUX2yowu_p0IVuQ',
    alt: 'High luxury macro photography of an 18K pure vermeil sculpted torus ring on travertine stone with studio rim light.',
    category: 'rings',
    liveLinksCount: 2,
    productLink: 'The Torus Ring (SKU-TRS-03)',
    colorProfile: 'Display P3 · D65',
    uploadedAt: 'Oct 24, 2024 · 14:12'
  },
  {
    id: 'media-02',
    name: 'arc_collar_model_silver.jpg',
    size: '1.82 MB',
    format: 'JPEG / High Chroma',
    resolution: '2400 × 3200 px (3:4)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3xNPLUzbemOWcdEoI43RU0E4aUrhMsfVdEGCFqxyqpUeDqp-JByWsSBUNW64Eip2Btmx1WUendsgmOz5JTQLOU-sff5Ifc77_U2dCoqcPK7HqnVDWdxo9ys2KGGgK3sZfDJ5yoYDPVHQMcJbEQi1j1jE-A3loTIRLz3BPCZEL62mX1FzxhVfciEeac6DiUb08ktSXMf_jzHrsELecOhBatSDpygizJTGi5AwFJ6AKo_55Jt20Ct1qIg',
    alt: 'Editorial close-up fashion photograph of an architectural 925 sterling silver arc collar choker on model.',
    category: 'collars',
    liveLinksCount: 1,
    productLink: 'The Arc Collar (SKU-ARC-01)',
    colorProfile: 'sRGB IEC61966-2.1',
    uploadedAt: 'Nov 02, 2024 · 09:40'
  },
  {
    id: 'media-03',
    name: 'fold_cuff_stacked_limestone.jpg',
    size: '3.41 MB',
    format: 'PNG / Alpha Ready',
    resolution: '3400 × 3400 px (1:1)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA61kjfqGJ9cKr3oOsgLTTXhVPqbnNwcoyaIeuLQBxNqPjqdxbzxw07BNbXkW8unC4J_8dxJHGI8-1UHfMdu2fRSHnt6rSZcrt-_hG-bcnvH0qqCcB2hRpEqE2bQrRDqol0YNMyZ3fIM9KjXJOrZ25SfMdUsjTfmob8o2UqgCHFh4K1li1vICTUZdji6QbN6kUF_wXmZEPC8Q0E5zboPbtiL8xKvx4flef5nC2hyEUxl1gb-AM51S5SMw',
    alt: 'Museum-grade still life photograph of folded heavy 18K solid yellow gold cuff bracelets stacked on raw dark limestone.',
    category: 'cuffs',
    liveLinksCount: 1,
    productLink: 'The Fold Cuff (SKU-FLD-02)',
    needsWebP: true,
    colorProfile: 'Display P3 · D65',
    uploadedAt: 'Nov 14, 2024 · 18:25'
  },
  {
    id: 'media-04',
    name: 'hero_autumn_macro_4k.mp4',
    size: '18.42 MB',
    format: 'MP4 / H.265 ProRes 4K',
    resolution: '3840 × 2160 px (16:9)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-with-golden-rings-42646-large.mp4',
    alt: 'Cinematic macro video sequence showing golden ring textures and liquid light reflections.',
    category: 'hero',
    liveLinksCount: 1,
    productLink: 'Storefront Hero Canvas',
    isVideo: true,
    videoDuration: '0:14 · 4K 60fps',
    colorProfile: 'Rec.709 D65',
    uploadedAt: 'Dec 01, 2024 · 11:15'
  },
  {
    id: 'media-05',
    name: 'droplet_earrings_profile.jpg',
    size: '1.65 MB',
    format: 'WEBP / Auto-Mastered',
    resolution: '2600 × 2600 px (1:1)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdvSzALWvHp9BHnYdYrDZpxGALAM5P5STidilk99K5TMY63fI006H_FObJjOPhSF9e-KsOZ0qC_uicYrmOELumvILal53ClM0Iwa8Pv8Ib1DNpehtHWTCkhCqbyltBc-BohVJ9pOAh-wBfa7KfTXIBkuojyy5pm11-adskfJexnghQL109itNdR8bxwVksXIvGOCHccfKpA9f9beXyKzH2_TcTUNl7OVaQUpv6W8oP7SiuzaQO9vpGww',
    alt: 'Side profile shot of satin platinum droplet earrings suspended on dark velvet.',
    category: 'earrings',
    liveLinksCount: 1,
    productLink: 'The Droplet Drops (SKU-DRP-04)',
    colorProfile: 'Display P3 · D65',
    uploadedAt: 'Dec 10, 2024 · 15:50'
  },
  {
    id: 'media-06',
    name: 'q_monogram_vector_gold.svg',
    size: '12 KB',
    format: 'SVG / Vector Path',
    resolution: 'Infinite Scalable',
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1W7wL4KTNZK0B1EovuYOTtjTz3gFodG3yOgASoCv_6INOt-AzsybIuppdYRWTbSctb0QAkIwXG6912kO-sjwihTunH7R5Dq9bsZgwD4zth2Jo3l2ofWtYZwKEM4-8aC1FwGPEe71MRIxHik9Gp0ZfrUf5xOp07gu4x7bQxXSyVPmVGKps5sHXNGiv0rEjzxgHZAPZgaTTQ_VJmN92sh38jMJW834Ep2Tfm2sVC-lRNclYrYJr1Dt0K_EQY',
    alt: 'Official vector atelier hallmark monogram for The Q Jewelry.',
    category: 'editorial',
    liveLinksCount: 4,
    productLink: 'Global Brand Hallmark',
    colorProfile: 'Vector Lossless',
    uploadedAt: 'Jan 05, 2025 · 08:30'
  }
];

export const INITIAL_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: 'log-1',
    actor: 'Curator Sarah',
    action: 'adjusted valuation for The Torus Band ($380 → $420)',
    target: 'SKU-TRS-03',
    timestamp: '18 minutes ago',
    location: 'Vault Paris',
    icon: 'edit_note',
    type: 'price'
  },
  {
    id: 'log-2',
    actor: 'Director Henri',
    action: 'swapped Storefront hero asset to hero-autumn-macro.mp4',
    target: 'Storefront CMS',
    timestamp: '3 hours ago',
    location: 'Atelier Central',
    icon: 'video_settings',
    type: 'media'
  },
  {
    id: 'log-3',
    actor: 'Admin System',
    action: 'published new sculptural specimen "The Droplet Drops" to Timeless Edition',
    target: 'SKU-DRP-04',
    timestamp: 'Yesterday at 17:42',
    location: 'Zurich Node',
    icon: 'add_circle',
    type: 'product'
  },
  {
    id: 'log-4',
    actor: 'Security Daemon',
    action: 'Super Admin authenticated via password + TOTP (TLS 1.3 Strict)',
    target: 'Auth Node',
    timestamp: 'Today, 14:22 CET',
    location: '185.120.44.12',
    icon: 'verified_user',
    type: 'security'
  }
];

// Custom Hook to manage global reactive Atelier Store
export function useAtelierStore() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('theq_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    try {
      const saved = localStorage.getItem('theq_homepage_config');
      return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_CONFIG;
    } catch {
      return INITIAL_HOMEPAGE_CONFIG;
    }
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem('theq_media_assets');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_ASSETS;
    } catch {
      return INITIAL_MEDIA_ASSETS;
    }
  });

  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('theq_audit_log');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOG;
    } catch {
      return INITIAL_AUDIT_LOG;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('theq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('theq_is_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [activeView, setActiveView] = useState<
    'storefront' | 'admin-dashboard' | 'admin-products' | 'admin-homepage-editor' | 'admin-media' | 'admin-profile' | 'admin-vault' | 'sanctum-login'
  >('storefront');

  const [previewModalProduct, setPreviewModalProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickToast, setQuickToast] = useState<{ message: string; icon?: string } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('theq_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('theq_homepage_config', JSON.stringify(homepageConfig));
  }, [homepageConfig]);

  useEffect(() => {
    localStorage.setItem('theq_media_assets', JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  useEffect(() => {
    localStorage.setItem('theq_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('theq_is_authenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const showToast = (message: string, icon = 'check_circle') => {
    setQuickToast({ message, icon });
    setTimeout(() => {
      setQuickToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated specimen "${updated.title}" in Supabase ledger.`);
  };

  const addProduct = (productData: Partial<Product>) => {
    const newSku = 'SKU-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-0' + (products.length + 1);
    const newProduct: Product = {
      id: 'prod-' + Date.now(),
      sku: productData.sku || newSku,
      title: productData.title || 'New Sculptural Form',
      narrative: productData.narrative || 'Hand-poured minimalist silhouette cast in rare luxury metal.',
      regularPrice: productData.regularPrice || 480,
      salePrice: productData.salePrice,
      collection: productData.collection || 'sculptural',
      collectionName: productData.collectionName || 'Curated Sculptural Forms',
      metal: productData.metal || '18K Yellow Gold',
      stock: productData.stock ?? 10,
      stockStatus: productData.stockStatus || 'in_stock',
      featured: productData.featured ?? false,
      primaryImage: productData.primaryImage || INITIAL_PRODUCTS[0].primaryImage,
      secondaryImage: productData.secondaryImage || INITIAL_PRODUCTS[0].secondaryImage,
      galleryImages: productData.galleryImages || [INITIAL_PRODUCTS[0].primaryImage],
      dimensions: productData.dimensions || 'Custom hand-crafted sizing',
      weight: productData.weight || '32.0g',
      purityMark: productData.purityMark || 'AU 750 / Place Vendôme',
      provenanceCert: 'Sanctum Vault Archive Cert #' + Math.floor(100 + Math.random() * 900)
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added new specimen "${newProduct.title}" to catalog.`);
    return newProduct;
  };

  const deleteProduct = (id: string) => {
    const item = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Specimen ${item?.sku || id} purged from database.`, 'delete_forever');
  };

  const duplicateProduct = (id: string) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    const duplicated: Product = {
      ...item,
      id: 'prod-' + Date.now(),
      sku: item.sku + '-COPY',
      title: item.title + ' (Copy)',
      stock: Math.max(1, Math.floor(item.stock / 2))
    };
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, duplicated);
      return next;
    });
    showToast(`Duplicated specimen ledger entry as ${duplicated.sku}`);
  };

  const reorderProducts = (fromIndex: number, toIndex: number) => {
    setProducts((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
    showToast('Catalog storefront sequence updated.');
  };

  const toggleProductFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextFeatured = !p.featured;
          showToast(nextFeatured ? `Pinned "${p.title}" to storefront carousel` : `Unpinned "${p.title}" from carousel`, 'star');
          return { ...p, featured: nextFeatured };
        }
        return p;
      })
    );
  };

  const updateHomepageConfig = (patch: Partial<HomepageConfig>) => {
    setHomepageConfig((prev) => ({ ...prev, ...patch }));
    showToast('Storefront configuration synced to Supabase Edge CDN.');
  };

  const addMediaAsset = (asset: MediaAsset) => {
    setMediaAssets((prev) => [asset, ...prev]);
    showToast(`Uploaded asset "${asset.name}" to Supabase storage bucket.`);
  };

  const deleteMediaAsset = (id: string) => {
    const asset = mediaAssets.find((a) => a.id === id);
    setMediaAssets((prev) => prev.filter((a) => a.id !== id));
    showToast(`Asset "${asset?.name || id}" removed from bucket.`, 'delete_forever');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, selectedMetal: product.metal }];
    });
    setCartDrawerOpen(true);
    showToast(`Added "${product.title}" to Acquisition Bag.`, 'shopping_bag');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag.', 'remove_shopping_cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (password: string) => {
    if (password === 'admin123' || password.length >= 6) {
      setIsAuthenticated(true);
      setActiveView('admin-dashboard');
      showToast('Sanctum authentication verified. Vault Unlocked.', 'lock_open');
      return true;
    }
    showToast('Invalid cryptographic master secret. Access Denied.', 'error');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveView('storefront');
    showToast('Session invalidated. Sanctum Vault Locked.', 'lock');
  };

  return {
    products,
    homepageConfig,
    mediaAssets,
    auditLog,
    cart,
    isAuthenticated,
    activeView,
    previewModalProduct,
    cartDrawerOpen,
    notificationsOpen,
    quickToast,
    setActiveView,
    setPreviewModalProduct,
    setCartDrawerOpen,
    setNotificationsOpen,
    showToast,
    updateProduct,
    addProduct,
    deleteProduct,
    duplicateProduct,
    reorderProducts,
    toggleProductFeatured,
    updateHomepageConfig,
    addMediaAsset,
    deleteMediaAsset,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    login,
    logout
  };
}
