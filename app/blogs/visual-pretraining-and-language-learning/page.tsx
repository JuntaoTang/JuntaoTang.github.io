import type { Metadata } from 'next';
import SiteNav from '../../components/site-nav';
import BlogKeywords from '../../components/blog-keywords';
import { formatBlogDate, visualPretrainingPost as post } from '../posts';
import '../article.css';

export const metadata: Metadata = {
  title: `${post.title} | Jun-Tao Tang`,
  description: post.description,
  keywords: post.keywords,
  alternates: { canonical: 'https://juntaotang.github.io/blogs/visual-pretraining-and-language-learning/' },
};
export const dynamic = 'force-static';

const contents = [
  ['visual-prediction', 'What the visual objective asks of the LLM'],
  ['chameleon', 'The connection to Chameleon'],
  ['shared-backbone', 'Why the shared backbone is difficult'],
  ['our-experience', 'What happened in our pipeline'],
  ['projector-swap', 'Following the change through the model'],
  ['interpretation', 'How I read these results'],
] as const;

const results = [
  ['MMMU', '36.8', '37.7', '36.0', '−1.7'],
  ['MMBench', '57.3', '62.6', '60.9', '−1.7'],
  ['ChartQA', '10.7', '11.1', '10.5', '−0.6'],
  ['ScienceQA', '62.1', '64.1', '61.8', '−2.3'],
  ['TextVQA', '20.0', '20.3', '12.3', '−8.0'],
  ['AI2D', '53.2', '51.4', '51.7', '+0.3'],
  ['MathVista', '26.9', '26.8', '28.2', '+1.4'],
  ['DocVQA', '8.4', '8.5', '6.2', '−2.3'],
  ['GQA', '41.9', '41.4', '41.0', '−0.4'],
  ['POPE', '82.3', '85.2', '84.5', '−0.7'],
];

function Cite({ n }: { n: number }) {
  return <sup className="article-cite"><a href={`#reference-${n}`} aria-label={`Reference ${n}`}>[{n}]</a></sup>;
}

function Stage({ title, note }: { title: string; note: string }) {
  return <div className="route-stage"><strong>{title}</strong><span>{note}</span></div>;
}

export default function VisualPretrainingAndLanguageLearning() {
  return (
    <main className="site-shell article-site">
      <SiteNav active="blogs" />
      <div className="article-layout">
        <aside className="article-toc"><nav aria-label="On this page"><p>On this page</p><ol>{contents.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol><a className="toc-references" href="#references">References</a></nav></aside>
        <article className="longform" lang="en">
          <header className="article-header">
            <a className="article-back" href="/blogs/">← All blogs</a>
            <p className="article-byline"><time dateTime={post.date}>{formatBlogDate(post.date)}</time><span aria-hidden="true"> · </span>Jun-Tao Tang</p>
            <h1>{post.title}</h1>
            <p className="article-dek">Reading visual pretraining through shared-backbone optimization and our continual-pretraining experiments.</p>
            <BlogKeywords keywords={post.keywords} />
          </header>
          <div className="article-prose">
            <p className="article-opening">A scientific page contains more than the text extracted from it. Equations have spatial structure, figures express relationships, and layout connects pieces of an argument. Visual pretraining offers an appealing way to learn from that information: make the language model predict visual content as well as text.</p>
            <p>I find that motivation compelling. The difficulty is in the optimization. An MLLM training pipeline is organized around turning visual evidence into language. Adding a visual prediction objective asks the same parameters to support another output space and another notion of a good representation. In our continual-pretraining experiments, progress on that additional objective did not translate into better overall multimodal performance.</p>
            <p>Chameleon provides a useful starting point for understanding this tension. Its analysis makes modality competition concrete, while the visual-pretraining papers use output interfaces that place the competition elsewhere in the computation. The connection is most informative when we follow exactly which parameters and prediction targets are shared.</p>

            <section id="visual-prediction">
              <h2>1. What the visual objective asks of the LLM</h2>
              <p><em>Exploring Visual Pretraining for Learning Language Intelligence</em> introduces MAPLE. Document images are encoded into foreground latents, and the LLM produces hypotheses for unseen regions. A MAR decoder and a VAE decoder turn those hypotheses into reconstructed pages. The LLM is jointly trained with ordinary text prediction, using separate visual and textual losses.<Cite n={1} /></p>
              <p><em>Scalable Visual Pretraining for Language Intelligence</em> uses a simpler visual output path. A frozen vision tower supplies document features; an input projector maps them into the LLM. A prediction head maps LLM states back to the visual-feature space and learns to identify the next foreground feature through a contrastive objective.<Cite n={2} /></p>
              <div className="article-table-wrap"><table>
                <thead><tr><th>Design</th><th>Visual target</th><th>Output interface</th></tr></thead>
                <tbody>
                  <tr><td>MAPLE</td><td>Latents supporting page reconstruction</td><td>Visual decoder, alongside the text output head</td></tr>
                  <tr><td>Decoder-free VP</td><td>Continuous features of the next page region</td><td>Feature prediction head, alongside the text output head</td></tr>
                  <tr><td>Chameleon</td><td>Discrete image-code IDs</td><td>A joint vocabulary containing text and image codes</td></tr>
                </tbody>
              </table></div>
              <p>These designs all ask a shared backbone to model vision and language, but the targets differ. In particular, the continuous-feature version does not add visual IDs to the text softmax. Its visual loss has its own contrastive normalization over candidate features.</p>
              <p>The papers’ intended transfer is also worth keeping in view. They study whether modeling visually rich documents improves language and scientific reasoning. Our experiment adapts the next-feature idea to an existing MLLM training pipeline, where the immediate concern is preserving and improving image-conditioned answering.</p>
            </section>

            <section id="chameleon">
              <h2>2. The connection to Chameleon</h2>
              <p>Chameleon’s Section 2.3 reports an instability in mixed-modal training: modalities with different entropy can drive gradual norm growth, eventually leading to divergence. The authors connect this behavior to softmax and logit drift, and observe that an ablation without image generation avoids the instability.<Cite n={3} /></p>
              <p>Chameleon makes joint modeling work with a carefully designed stability recipe, including QK normalization, changes to normalization placement, and z-loss regularization. This is valuable evidence that assigning both visual and textual prediction to one Transformer has an optimization cost that the architecture must address.</p>
              <figure className="route-figure">
                <div className="route-label">Chameleon: joint discrete prediction</div>
                <div className="route-flow route-flow-three">
                  <Stage title="Text and image codes" note="Two kinds of discrete input" /><span className="route-arrow" aria-hidden="true">→</span>
                  <Stage title="Shared Transformer" note="Parameters updated by both modalities" /><span className="route-arrow" aria-hidden="true">→</span>
                  <Stage title="Joint vocabulary" note="Text IDs and image IDs" />
                </div>
                <div className="route-label second-route-label">Continuous-feature VP: separate heads, shared computation</div>
                <div className="route-flow route-flow-three">
                  <Stage title="Text and visual features" note="Separate input representations" /><span className="route-arrow" aria-hidden="true">→</span>
                  <Stage title="Shared Transformer" note="Parameters updated by both objectives" /><span className="route-arrow" aria-hidden="true">→</span>
                  <Stage title="Separate output heads" note="Text prediction · visual feature prediction" />
                </div>
                <figcaption><span>Figure 1.</span> Separate heads change the output-level interaction. Both objectives still update the shared Transformer.</figcaption>
              </figure>
              <p>For continuous-feature VP, I would place the concern at the shared backbone: the representation and updates needed for visual prediction can interfere with those used for language. Chameleon motivates taking that interaction seriously. Its specific norm-growth explanation applies to its own mixed-token setup; our runs showed smooth losses rather than the numerical divergence described there.</p>
            </section>

            <section id="shared-backbone">
              <h2>3. Why the shared backbone is difficult</h2>
              <p>In an image–question–answer example, the training signal rewards a textual answer grounded in selected visual evidence. The model needs the distinctions relevant to that answer: the characters on a sign, a plotted value, or a relation between objects.</p>
              <p>Next-feature prediction rewards matching the frozen visual encoder’s representation of a future region. That representation can organize information differently from the text answer space. A region’s appearance or broad semantic similarity may be easy to predict while a small character distinction remains difficult to read. Whether the visual target preserves such distinctions depends on the encoder and extraction point.</p>
              <p>My working explanation is that this creates two demands on the same hidden states. Visual prediction favors features that are useful to its prediction head; image-conditioned language learning favors features that make the right text answer easy to produce. Useful transfer depends on how well those demands agree.</p>
              <p>Separate heads can absorb some task-specific structure, but their gradients still pass through the shared layers. If the two objectives favor different parameter updates, optimizing their sum can slow one task while improving the other. The loss weight controls their contribution to the objective; actual influence also depends on target counts, normalization, gradient magnitudes, and which modules are trainable.</p>
              <p>This gives a practical reason to be cautious about adding VP late in a pipeline. The language model is already organized around textual prediction, and projector alignment has started to establish an input interface. Visual prediction then changes what that interface and the backbone are being trained to preserve. A lower combined loss can accompany a less useful representation for answering questions.</p>
            </section>

            <section id="our-experience">
              <h2>4. What happened in our pipeline</h2>
              <p>We used a LLaVA-style training sequence. After the projector alignment stage, we added continual pretraining and then applied SFT. The visual objective predicted continuous visual features, mixed with ordinary image–text supervision. Its training images emphasized scientific diagrams and flowcharts.</p>
              <p>The comparison has three branches: <strong>A</strong> proceeds from alignment directly to SFT; <strong>B</strong> adds continual pretraining with text-output supervision; <strong>C</strong> adds visual prediction to that continual-pretraining stage. B versus C measures the effect of adding VP with its visual training data within our chosen recipe.</p>
              <div className="article-table-wrap"><table>
                <thead><tr><th>Benchmark</th><th>A: no CPT</th><th>B: text-output CPT</th><th>C: CPT + VP</th><th>C − B</th></tr></thead>
                <tbody>{results.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}
                  <tr><td><strong>Reported average</strong></td><td>39.96</td><td>40.90</td><td>39.31</td><td>−1.59</td></tr>
                </tbody>
              </table></div>
              <p>These are the ten benchmarks retained in the aggregate in our experiment notes. Scores follow the scales recorded there. The average decreases after adding VP, with the largest drop on TextVQA. MathVista and AI2D improve, so the change is uneven across tasks.</p>
              <p>The training curves were uneventful in the usual numerical sense: losses decreased smoothly and gradient norms showed no reported explosion. Within continual pretraining, however, the ordinary image–text CE loss decreased more slowly in C than in B, while the visual prediction objective improved. The model was learning the added task while making less progress on the text-output task.</p>
              <p>That pattern fits an optimization-interference explanation. The document-heavy visual distribution is also part of this comparison, so the result concerns this objective–data combination. It differs from the original papers’ matched-document language-reasoning experiments in backbone, training mixture, and evaluation target.</p>
            </section>

            <section id="projector-swap">
              <h2>5. Following the change through the model</h2>
              <p>We also exchanged the projectors of the B and C continual-pretraining checkpoints. Each combination was then fine-tuned on the same 20,000 reading examples from Mix665K: 10,000 from TextCaps and 10,000 from OCR-VQA. The following table records the final TextVQA scores from that follow-up, after 156 steps.</p>
              <div className="article-table-wrap"><table>
                <thead><tr><th>LLM weights</th><th>Projector</th><th>TextVQA after reading SFT</th></tr></thead>
                <tbody>
                  <tr><td>B</td><td>B</td><td>9.0</td></tr>
                  <tr><td>C</td><td>C</td><td>7.4</td></tr>
                  <tr><td>C</td><td>B</td><td>8.4</td></tr>
                  <tr><td>B</td><td>C</td><td>9.1</td></tr>
                </tbody>
              </table></div>
              <p>Replacing C’s projector with B’s recovers part of the gap. Keeping B’s LLM and using C’s projector reaches approximately the B baseline after fine-tuning. Both sides of the interface therefore matter, and the weaker result associated with C is not confined to a projector that has become permanently unusable.</p>
              <p>The swap is followed by additional reading SFT, so I read this as a test of the interface and recovery behavior. It supports looking inside the shared LLM as well as at the projector. These follow-up scores come from a smaller reading-only recipe and should be read separately from the full-SFT table above.</p>
            </section>

            <section id="interpretation">
              <h2>6. How I read these results</h2>
              <p>The attractive idea behind visual pretraining is to recover information that text extraction throws away. The papers demonstrate why scientific pages are an interesting source of that information. Our experience raises a different implementation question: how can an existing MLLM learn to predict visual representations while retaining the representation it needs to read and answer?</p>
              <p>For our pipeline, the central difficulty was the interaction between objectives. The visual prediction objective improved, but ordinary image–text learning slowed and downstream reading performance deteriorated. Chameleon helps frame the concern: joint prediction requires deliberate treatment of modality interactions. Continuous targets and separate heads change the form of that interaction while leaving shared-backbone optimization as a central issue.</p>
              <p>I therefore see visual pretraining as a demanding multi-objective training problem. Its value depends on the visual target, the representation being updated, and the task to which learning should transfer. In our current adaptation, the cost to image-conditioned language learning outweighed the benefit of the extra visual objective.</p>
              <p>For a complementary view of visual self-supervision that retains textual outputs, see <a href="/blogs/self-supervised-post-training/">Self-Supervised Post-Training for Stronger MLLMs</a>.</p>
            </section>

            <section id="references" className="article-references">
              <h2>References</h2>
              <ol>
                <li id="reference-1">Zhonghan Zhao et al. <a href="https://openaccess.thecvf.com/content/CVPR2026/papers/Zhao_Exploring_Visual_Pretraining_for_Learning_Language_Intelligence_CVPR_2026_paper.pdf" target="_blank" rel="noreferrer">Exploring Visual Pretraining for Learning Language Intelligence.</a> CVPR, 2026.</li>
                <li id="reference-2">Yiming Zhang et al. <a href="https://arxiv.org/abs/2607.09657" target="_blank" rel="noreferrer">Scalable Visual Pretraining for Language Intelligence.</a> 2026.</li>
                <li id="reference-3">Chameleon Team. <a href="https://arxiv.org/abs/2405.09818v2" target="_blank" rel="noreferrer">Chameleon: Mixed-Modal Early-Fusion Foundation Models.</a> 2024; version 2, 2025. See Section 2.3.</li>
              </ol>
            </section>
            <footer className="article-footer"><a href="/blogs/">← Back to Blogs</a><a href="/">Jun-Tao Tang</a></footer>
          </div>
        </article>
      </div>
    </main>
  );
}
