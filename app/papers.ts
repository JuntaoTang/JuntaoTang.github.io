export type Author = { name: string; me?: boolean; equal?: boolean };
export type Paper = {
  label: string;
  status: string;
  title: string;
  authors: Author[];
  venueFull: string;
  venueShort: string;
  image: string;
  link?: string;
  code?: string;
  huggingFace?: string;
  media?: string;
  slides?: string;
  preprint?: boolean;
  showEqual?: boolean;
  contributionNote?: string;
};

export const papers: Paper[] = [
  {
    label: 'ICML', status: 'Conference paper',
    title: 'SAME: Stabilized Mixture-of-Experts for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Zhen-Hao Xie', equal: true }, { name: 'Jun-Tao Tang', me: true, equal: true },
      { name: 'Yu-Cheng Shi' }, { name: 'Han-Jia Ye' }, { name: 'De-Chuan Zhan' }, { name: 'Da-Wei Zhou' },
    ],
    venueFull: 'International Conference on Machine Learning.', venueShort: 'ICML 2026',
    image: '/assets/papers/same.png', showEqual: true, contributionNote: '* Equal contribution',
    link: 'https://arxiv.org/abs/2602.01990',
    code: 'https://github.com/LAMDA-CL/Prism',
    huggingFace: 'https://huggingface.co/datasets/JuntaoTang/TriGap',
    media: 'https://mp.weixin.qq.com/s/uJqE_5Acw9war3laNVFGcw',
  },
  {
    label: 'EMNLP', status: 'Main Conference paper',
    title: 'CRAM: Centroid-Routing and Adaptive MoE for Multimodal Continual Instruction Tuning',
    authors: [{ name: 'Jun-Tao Tang', me: true }, { name: 'Zhen-Hao Xie' }, { name: 'Yu-Cheng Shi' }, { name: 'Da-Wei Zhou' }],
    venueFull: 'Conference on Empirical Methods in Natural Language Processing.', venueShort: 'EMNLP 2026',
    image: '/assets/papers/cram.png',
    link: 'https://arxiv.org/abs/2606.02502',
    code: 'https://github.com/LAMDA-CL/EMNLP2026-CRAM',
    slides: '/assets/slides/cram-emnlp2026.pdf',
  },
  {
    label: 'ACM MM', status: 'Conference paper',
    title: 'Active Quality Assessment and Hierarchical Aggregation for Incomplete Multi-View Multi-Label Classification',
    authors: [
      { name: 'Kewei Wen' }, { name: 'Jun-Tao Tang', me: true }, { name: 'Bob Zhang' }, { name: 'Yanghao Zhou' },
      { name: 'Chao Huang' }, { name: 'Jie Wen' }, { name: 'Chengliang Liu' },
    ],
    venueFull: 'ACM International Conference on Multimedia.', venueShort: 'ACM MM 2026',
    image: '/assets/papers/area.png',
  },
  {
    label: 'Preprint', status: 'Preprint',
    title: 'A Strong Baseline for Evaluating Vision Encoders in Multimodal Large Language Models',
    authors: [
      { name: 'Yilin Yang', equal: true }, { name: 'Jun-Tao Tang', me: true, equal: true },
      { name: 'Kengyi Wang' }, { name: 'Siyuan Su' }, { name: 'Gaoyong Luo' }, { name: 'Mingda Chen' },
    ],
    venueFull: 'Preprint ·', venueShort: 'arXiv:2610.05413',
    image: '/assets/papers/ravel-figure7.png', link: 'https://arxiv.org/abs/2610.05413',
    code: 'https://github.com/JuntaoTang/MLLM-VisionEncoder-Eval',
    huggingFace: 'https://huggingface.co/336labs/VisionEncoder-to-MLLM-ModelZoo',
    media: 'https://mp.weixin.qq.com/s/2nxe2TrqSe-JKhrp1Oru7A',
    preprint: true, showEqual: true, contributionNote: '* Equal contribution',
  },
  {
    label: 'Preprint', status: 'Preprint',
    title: 'Prism: A Plug-in Reproducible Infrastructure for Scalable Multimodal Continual Instruction Tuning',
    authors: [{ name: 'Jun-Tao Tang', me: true }, { name: 'Yu-Cheng Shi' }, { name: 'Zhen-Hao Xie' }, { name: 'Da-Wei Zhou' }],
    venueFull: 'Preprint ·', venueShort: 'arXiv:2605.26110', image: '/assets/papers/prism.png',
    link: 'https://arxiv.org/abs/2605.26110', preprint: true,
    code: 'https://github.com/LAMDA-CL/Prism',
    huggingFace: 'https://huggingface.co/datasets/JuntaoTang/TriGap',
  },
  {
    label: 'Preprint', status: 'Preprint',
    title: 'ProtoAda: Prototype-Guided Adaptive Adapter Expansion and Geometric Consolidation for Multimodal Continual Instruction Tuning',
    authors: [{ name: 'Yu-Cheng Shi' }, { name: 'Zhen-Hao Xie' }, { name: 'Jun-Tao Tang', me: true }, { name: 'Da-Wei Zhou' }],
    venueFull: 'Preprint ·', venueShort: 'arXiv:2606.02576', image: '/assets/papers/protoada.png',
    link: 'https://arxiv.org/abs/2606.02576', preprint: true,
    code: 'https://github.com/LAMDA-CL/Prism',
  },
];
