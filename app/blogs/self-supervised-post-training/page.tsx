import type { Metadata } from 'next';
import SiteNav from '../../components/site-nav';
import BlogKeywords from '../../components/blog-keywords';
import { formatBlogDate, selfSupervisedPostTrainingPost as post } from '../posts';
import '../article.css';
import './figures.css';

export const metadata: Metadata = {
  title: `${post.title} | Jun-Tao Tang`,
  description: post.description,
  alternates: { canonical: 'https://juntaotang.github.io/blogs/self-supervised-post-training/' },
};
export const dynamic = 'force-static';

const contents = [
  ['verifiable-vision', 'A verifier without image annotations'],
  ['reference-points', 'Four useful reference points'],
  ['effective-difficulty', 'Difficulty relative to the model'],
  ['reasoning-and-answer', 'Reasoning and final answers'],
] as const;

function Cite({ n }: { n: number }) {
  return <sup className="article-cite"><a href={`#reference-${n}`} aria-label={`Reference ${n}`}>[{n}]</a></sup>;
}

function PuzzleGrid({ order, labels }: { order: number[]; labels?: number[] }) {
  return <div className="ssl-puzzle-grid" aria-hidden="true">{order.map((tile, i) => <div className="ssl-tile" key={i} style={{ backgroundPosition: `${((tile - 1) % 3) * 50}% ${Math.floor((tile - 1) / 3) * 50}%` }}>{labels && <span>{labels[i]}</span>}</div>)}</div>;
}

function RewardGroup({ title, rewards, children, contrast = false }: { title: string; rewards: number[]; children: React.ReactNode; contrast?: boolean }) {
  return <div className={`ssl-reward-group${contrast ? ' ssl-reward-group-contrast' : ''}`}><strong className="ssl-panel-title">{title}</strong><div className="ssl-reward-bars" role="img" aria-label={`Candidate rewards: ${rewards.join(', ')}`}>{rewards.map((reward, i) => <div className="ssl-reward-bar" key={i} style={{ height: `${reward * 90}px` }}><span>{reward.toFixed(2)}</span></div>)}</div><p>{children}</p></div>;
}

export default function SelfSupervisedPostTraining() {
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
            <p className="article-dek">Visual puzzles, verifiable rewards, and what existing studies reveal about transfer, model scale, and reasoning.</p>
            <BlogKeywords keywords={post.keywords} />
          </header>
          <div className="article-prose">
            <p className="article-opening">Cut an image into patches, shuffle them, and ask a multimodal model to recover their arrangement. A few lines of code can generate the question and check the answer. This makes an old visual learning task an attractive source of rewards for post-training MLLMs.</p>
            <p>The papers covered here study which visual tasks transfer, how rewards support learning, and how the gains change with model scale. Together they raise a useful question: <strong>what does solving a visual puzzle teach an MLLM?</strong></p>

            <section id="verifiable-vision">
              <h2>1. A verifier without image annotations</h2>
              <p>For many synthetic text tasks, the program that creates a question also knows its answer. A visual transformation offers the same opportunity. The program does not need to understand what a photograph depicts to remember which patch came from which position.</p>
              <p>This is the central convenience of self-supervision: the target comes from the construction of the task. Jigsaw-based representation learning used this idea well before the current wave of multimodal RL; Noroozi and Favaro developed a visual pretext task around it in 2016.<Cite n={1} /> In post-training, the model can express its solution as text, and the known transformation supplies a verifiable reward.</p>
              <figure className="ssl-puzzle-figure">
                <div className="ssl-puzzle-panels">
                  <div className="ssl-puzzle-panel"><strong className="ssl-panel-title">1. Construct the puzzle</strong><PuzzleGrid order={[1, 2, 3, 4, 5, 6, 7, 8, 9]} /><span className="ssl-panel-note">The program records the source positions.</span></div>
                  <div className="ssl-puzzle-panel"><strong className="ssl-panel-title">2. Present shuffled patches</strong><PuzzleGrid order={[7, 1, 5, 9, 3, 6, 4, 8, 2]} labels={[1, 2, 3, 4, 5, 6, 7, 8, 9]} /><span className="ssl-panel-note">Labels identify patches in the shuffled input.</span></div>
                  <div className="ssl-puzzle-panel"><strong className="ssl-panel-title">3. Verify the arrangement</strong><PuzzleGrid order={[1, 2, 3, 4, 5, 6, 7, 8, 9]} labels={[2, 9, 5, 7, 3, 6, 1, 8, 4]} /><span className="ssl-panel-note">Read labels row by row to obtain the answer.</span></div>
                </div>
                <figcaption><span>Figure 1.</span> A programmatically verifiable visual task. For this example, the correct output is [2, 9, 5, 7, 3, 6, 1, 8, 4]. The intact image is shown here to explain construction; the solver receives the shuffled patches.</figcaption>
              </figure>
              <p>Reinforcement learning adds a policy optimization loop. Sample several solutions, score them, and increase the likelihood of better-performing responses relative to the alternatives. GRPO provides a practical group-relative formulation of that loop.<Cite n={2} /> The design work moves into the task generator, verifier, and reward.</p>
              <p>A useful verifier first checks that an answer is structurally valid. For a full jigsaw, every patch must appear exactly once. Repeated indices, missing pieces, and out-of-range values should not earn placement credit. Once validity is established, partial correctness can distinguish progress long before a model solves an entire arrangement.</p>
            </section>

            <section id="reference-points">
              <h2>2. Four useful reference points</h2>
              <p><em>Jigsaw-R1</em> studies full arrangements and pairwise spatial questions, with and without explicit reasoning. It shows that puzzle learning can transfer, while the question format and inference mode affect the outcome.<Cite n={3} /> <em>Visual Jigsaw</em> develops ordering tasks across images, videos, and 3D data, using the known order as supervision.<Cite n={4} /></p>
              <p><em>SSL4RL</em> broadens the task family to rotation, jigsaw, position prediction, and contrastive matching. Its comparisons show that different pretext tasks favor different downstream abilities.<Cite n={5} /> <em>PuzzleCraft</em> focuses on training dynamics: it combines difficulty and solution diversity in a curriculum, monitors reasoning–answer consistency, and studies an optional consistency-aware optimization add-on.<Cite n={6} /></p>
              <div className="article-table-wrap"><table className="architecture-table">
                <thead><tr><th>Work</th><th>Main lens</th><th>Design question it brings into focus</th></tr></thead>
                <tbody>
                  <tr><td>Jigsaw-R1</td><td>Task formulation and generalization</td><td>Which puzzle questions transfer to ordinary visual tasks?</td></tr>
                  <tr><td>Visual Jigsaw</td><td>Verifiable ordering</td><td>How can partial credit make structured visual tasks trainable?</td></tr>
                  <tr><td>SSL4RL</td><td>Multiple pretext tasks</td><td>Which transformations teach the abilities a model needs?</td></tr>
                  <tr><td>PuzzleCraft</td><td>Difficulty and exploration</td><td>Which prompt groups still supply useful comparisons?</td></tr>
                </tbody>
              </table></div>
              <p>Reward details matter. Visual Jigsaw gives full credit to an exact solution, discounted placement credit to a valid partial solution, and zero accuracy reward to an invalid permutation. It also uses a format bonus of 0.2, with malformed responses receiving neither format nor accuracy reward.<Cite n={4} /> This separates three things a training curve can otherwise mix together: producing a parseable response, producing a legal arrangement, and solving it correctly.</p>
              <p>The comparison with SFT is most useful at the level of behavior. SFT optimizes supplied responses; RL changes the relative probability of sampled responses according to the verifier. Jigsaw-R1 reports better transfer with RL in its setting and finds that an SFT cold start can impair later RL optimization.<Cite n={3} /></p>
            </section>

            <section id="effective-difficulty">
              <h2>3. Difficulty relative to the model</h2>
              <p>A fixed task can become a poor teacher as the student improves. SSL4RL reports smaller downstream gains when moving from a 3B to a 7B model; increasing the jigsaw and position grids to 5 × 5 did not yield a significant further improvement in that study.<Cite n={5} /> This motivates a distinction between making a puzzle larger and making it educationally useful.</p>
              <p>Task combinations introduce another complication. SSL4RL finds that simply combining its four rewards does not outperform the best individual setups.<Cite n={5} /> The effects of distinct pretext tasks therefore do not add up automatically.</p>
              <h3>Reward contrast and solution diversity</h3>
              <p>In group-relative optimization, the reward-driven advantage compares a response with other responses to the same prompt. When all sampled responses receive the same reward, this comparison supplies no preference between them. The reward-relative policy term then has no signal from that group; auxiliary terms, when present, are separate.<Cite n={2} /></p>
              <figure className="ssl-reward-figure">
                <div className="ssl-reward-groups">
                  <RewardGroup title="All solved" rewards={[1, 1, 1, 1]}>Every sampled solution gets full credit. The group gives no reward preference.</RewardGroup>
                  <RewardGroup title="Different partial solutions" rewards={[0, 0.25, 0.5, 1]} contrast>Graded rewards distinguish candidate outcomes and provide a direction for the update.</RewardGroup>
                  <RewardGroup title="Different solutions, one score" rewards={[0.5, 0.5, 0.5, 0.5]}>The model can explore distinct arrangements while the scalar reward treats them identically.</RewardGroup>
                </div>
                <figcaption><span>Figure 2.</span> Illustrative reward groups for a four-tile puzzle scored by the fraction of correct placements. The bars show candidate rewards, not measured training results. All-failure groups have the same lack of reward contrast as all-success groups.</figcaption>
              </figure>
              <p>The reverse distinction also matters: different explanations can end in the same permutation. Textual diversity then overstates exploration of the solution space. PuzzleCraft explicitly tracks solution-space dispersion alongside difficulty to downweight collapsed groups.<Cite n={6} /> Reward variance and arrangement diversity describe different aspects of a rollout batch.</p>
            </section>

            <section id="reasoning-and-answer">
              <h2>4. Reasoning and final answers</h2>
              <p>Three measurements belong on separate axes: whether the final answer is correct, whether the written rationale supports it, and whether generating that rationale improves the answer. Jigsaw-R1 observes that answer accuracy can rise while the rationale becomes less consistent with it.<Cite n={3} /> An outcome reward directly scores the submitted arrangement, so this divergence fits the optimization target.</p>
              <p>Evaluation choices differ across these studies. Visual Jigsaw uses short-answer evaluation for its vision-centric comparisons.<Cite n={4} /> Jigsaw-R1 finds that models can learn and generalize with or without explicit reasoning, with direct answering often working better for the open-source models it studies.<Cite n={3} /></p>
              <p>PuzzleCraft monitors reasoning–answer consistency and explores consistency-aware optimization.<Cite n={6} /> These results make the inference mode and the agreement between rationale and answer part of the empirical picture, alongside puzzle accuracy and downstream transfer.</p>
            </section>

            <section id="references" className="article-references">
              <h2>References</h2>
              <ol>
                <li id="reference-1">Mehdi Noroozi and Paolo Favaro. <a href="https://arxiv.org/abs/1603.09246" target="_blank" rel="noreferrer">Unsupervised Learning of Visual Representations by Solving Jigsaw Puzzles.</a> 2016.</li>
                <li id="reference-2">Zhihong Shao et al. <a href="https://arxiv.org/abs/2402.03300" target="_blank" rel="noreferrer">DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models.</a> 2024.</li>
                <li id="reference-3">Zifu Wang et al. <a href="https://arxiv.org/abs/2505.23590" target="_blank" rel="noreferrer">Jigsaw-R1: A Study of Rule-based Visual Reinforcement Learning with Jigsaw Puzzles.</a> 2025. <a href="https://github.com/zifuwanggg/Jigsaw-R1" target="_blank" rel="noreferrer">Code.</a></li>
                <li id="reference-4">Penghao Wu et al. <a href="https://arxiv.org/abs/2509.25190" target="_blank" rel="noreferrer">Visual Jigsaw Post-Training Improves MLLMs.</a> 2025. <a href="https://penghao-wu.github.io/visual_jigsaw/" target="_blank" rel="noreferrer">Project.</a></li>
                <li id="reference-5">Xiaojun Guo et al. <a href="https://arxiv.org/abs/2510.16416" target="_blank" rel="noreferrer">SSL4RL: Revisiting Self-supervised Learning as Intrinsic Reward for Visual-Language Reasoning.</a> 2025.</li>
                <li id="reference-6">Ahmadreza Jeddi et al. <a href="https://arxiv.org/abs/2512.14944" target="_blank" rel="noreferrer">PuzzleCraft: Exploration-Aware Curriculum Learning for Puzzle-Based RLVR in VLMs.</a> 2026. <a href="https://puzzlecraftgrpo.github.io/" target="_blank" rel="noreferrer">Project.</a></li>
              </ol>
            </section>
            <footer className="article-footer"><a href="/blogs/">← Back to Blogs</a><a href="/">Jun-Tao Tang</a></footer>
          </div>
        </article>
      </div>
    </main>
  );
}
