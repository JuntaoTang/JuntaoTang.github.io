import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteNav from '../../components/site-nav';
import '../article.css';

const title = 'From Discrete Visual Tokens to Unified Multimodal Models';
const description = 'Notes on VQ tokenizers, semantic feature reuse, and training one autoregressive model for image understanding and generation.';

export const metadata: Metadata = {
  title: `${title} | Jun-Tao Tang`,
  description,
  alternates: { canonical: 'https://juntaotang.github.io/blogs/discrete-visual-tokenizers/' },
};
export const dynamic = 'force-static';

const contents = [
  ['four-objects', 'Four meanings of “visual token”'],
  ['where-semantics-enter', 'Where semantics enter'],
  ['input-and-output', 'Reading features, predicting IDs'],
  ['causality', 'The causal constraint'],
  ['training-signals', 'What trains the visual interface?'],
  ['debugging', 'Before scaling the experiment'],
  ['what-to-keep', 'Putting the interfaces together'],
] as const;

function Cite({ n }: { n: number }) {
  return <sup className="article-cite"><a href={`#reference-${n}`} aria-label={`Reference ${n}`}>[{n}]</a></sup>;
}

function Stage({ children, note, accent = false }: { children: ReactNode; note: string; accent?: boolean }) {
  return <div className={`route-stage${accent ? ' route-stage-accent' : ''}`}><strong>{children}</strong><span>{note}</span></div>;
}

function Arrow() { return <span className="route-arrow" aria-hidden="true">→</span>; }

export default function DiscreteVisualTokenizers() {
  return (
    <main className="site-shell article-site">
      <SiteNav active="blogs" />
      <div className="article-layout">
        <aside className="article-toc">
          <nav aria-label="On this page">
            <p>On this page</p>
            <ol>{contents.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
            <a className="toc-references" href="#references">References</a>
          </nav>
        </aside>

        <article className="longform" lang="en">
          <header className="article-header">
            <a className="article-back" href="/blogs/">← All blogs</a>
            <p className="article-byline"><time dateTime="2026-11-04">November 4, 2026</time><span aria-hidden="true"> · </span>Jun-Tao Tang</p>
            <h1>{title}</h1>
            <p className="article-dek">A practical view of visual codebooks, semantic features, and the interface between image understanding and autoregressive generation.</p>
          </header>

          <div className="article-prose">
            <p className="article-opening">A visual tokenizer defines the language in which a multimodal model reads and generates images. Its codes determine what the model predicts; its features determine what the model can readily understand. The connection between these two roles is the central design problem of a unified multimodal model.</p>
            <p>The phrase <em>visual token</em> hides several different objects: a discrete index, a vector in a reconstruction codebook, a semantic feature, and an input embedding for the LLM. They are related, but their roles are different. Much of the confusion in unified multimodal architectures starts when one of them is silently substituted for another.</p>
            <p>I began organizing these distinctions while connecting discrete tokenizers to a pretrained LLM. The discussion follows that process: start with the representation, locate its semantic features, connect the input and output paths, then examine the training signals.</p>

            <section id="four-objects">
              <h2>1. Four meanings of “visual token”</h2>
              <p>Consider an image encoded into a sequence of <var>T</var> visual positions. At each position, vector quantization selects an entry from a finite codebook. In the simplest single-codebook case, the objects worth distinguishing are:</p>
              <div className="article-table-wrap">
                <table>
                  <thead><tr><th>Object</th><th>Example shape</th><th>Its job</th></tr></thead>
                  <tbody>
                    <tr><td>Discrete indices</td><td><code>[T]</code></td><td>Identify the codes; serve as generation targets.</td></tr>
                    <tr><td>Codebook vectors</td><td><code>[T, d_code]</code></td><td>Represent the selected entries for the visual decoder.</td></tr>
                    <tr><td>Semantic features</td><td><code>[T, d_sem]</code></td><td>Expose information useful for language-conditioned understanding.</td></tr>
                    <tr><td>LLM input embeddings</td><td><code>[T, d_model]</code></td><td>Provide vectors in the language model’s input space.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>The first object is discrete; the other three are vectors. A discrete tokenizer therefore does not imply that every representation downstream is discrete. Even an ordinary text model turns integer token IDs into continuous embeddings before applying its Transformer.</p>
              <p>A code index is a label, not a semantic coordinate. Renaming every code consistently would not change what the tokenizer reconstructs. The associated codebook vector, however, is learned and contains information about the visual signal. VQ-VAE learns this discrete interface through an encoder, a quantizer, and a decoder; VQGAN develops the reconstruction side further with perceptual and adversarial training.<Cite n={1} /><Cite n={2} /></p>
              <p>Reconstruction organizes a codebook around the visual information needed by the decoder. Language alignment organizes features around concepts expressed in text. These objectives overlap, but emphasize different relationships: a representation that preserves texture and shape can still require substantial adaptation before those details become useful for answering questions.</p>
              <p>This distinction matters particularly when dimensions are compared. A small codebook dimension and a wide semantic feature dimension can coexist in the same model. Reporting only “the tokenizer dimension” leaves out which interface is being measured.</p>
            </section>

            <section id="where-semantics-enter">
              <h2>2. Where semantics enter</h2>
              <p>A reconstruction-oriented tokenizer gives the language model a visual alphabet. Chameleon is an important example of modeling text and image codes in one autoregressive sequence.<Cite n={3} /> The downstream model must learn how those image codes relate to language, in addition to learning their visual dependencies.</p>
              <p>Contrastive image–text training offers a way to prepare a more useful visual interface before that stage. CLIP supplies the familiar example: the representation is trained to associate images with their descriptions.<Cite n={4} /> For discrete tokenizers, the next question is where this semantic structure is learned relative to quantization.</p>

              <h3>Semantic features before quantization</h3>
              <p>One route starts from a visual encoder that already has language-aligned features, then teaches its quantized representation to retain both alignment and reconstructive information. VILA-U follows this direction: it initializes from CLIP, freezes the text encoder, and trains the visual components with reconstruction and contrastive objectives.<Cite n={5} /></p>
              <p>Here, the semantic prior enters through the visual encoder, while alignment is maintained on the quantized features. This connects the codebook to two demands at once: preserve the encoder’s language-relevant structure and retain enough visual detail for reconstruction.</p>

              <h3>Semantic features after quantization</h3>
              <p>Another route preserves a low-level visual alphabet and learns a semantic encoder over its code vectors. TokLIP is a useful example: VQ features pass through a mapping module and a causal token encoder, trained with contrastive supervision and distillation.<Cite n={6} /> The semantic output and the original reconstruction codebook remain distinct interfaces.</p>
              <p>UniTok approaches the same problem through representational capacity. It jointly learns the tokenizer, places attention-based transformations around quantization, and combines multiple codebooks.<Cite n={7} /> The four examples emphasize different parts of the interface:</p>
              <div className="article-table-wrap">
                <table className="architecture-table">
                  <thead><tr><th>Example</th><th>Architectural emphasis</th><th>What to inspect</th></tr></thead>
                  <tbody>
                    <tr><td>Chameleon</td><td>Mixed text and image-code modeling.</td><td>The learned visual-token interface in the multimodal model.</td></tr>
                    <tr><td>VILA-U</td><td>Quantize features with a semantic prior.</td><td>Alignment after quantization, not only encoder initialization.</td></tr>
                    <tr><td>TokLIP</td><td>Learn semantics over a discrete visual alphabet.</td><td>The causal token encoder’s output, not just raw code vectors.</td></tr>
                    <tr><td>UniTok</td><td>Joint supervision and multi-codebook capacity.</td><td>Factorization, grouped codes, and the downstream prediction head.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>The training graph makes this comparison precise. With a frozen reconstruction tokenizer, semantic training changes the encoder above its codes. With a trainable quantizer and visual encoder, a loss applied after VQ can also influence earlier layers through the chosen gradient estimator and update rules.</p>
              <p>The feature extraction point matters as well. An image-level contrastive objective acts on a pooled representation; the LLM usually consumes a sequence. Attention, pooling, and distillation determine how semantic information is distributed across that sequence. The relevant interface is the actual set of vectors passed to the LLM.</p>
            </section>

            <section id="input-and-output">
              <h2>3. Reading features, predicting IDs</h2>
              <p>There are two straightforward ways to connect this visual alphabet to an LLM. The first learns an embedding table directly from image-code IDs. The second reuses features supplied by the tokenizer and learns a projector into the LLM’s hidden dimension.</p>
              <p>For a concrete example, the configuration in my notes starts with 8-dimensional code vectors, produces 1,152-dimensional contextual semantic features, and projects them to a 2,048-dimensional LLM input. These widths belong to three different modules: the reconstruction codebook, the semantic token encoder, and the LLM interface.</p>
              <figure className="route-figure">
                <div className="route-label">Direct visual embedding</div>
                <div className="route-flow route-flow-three">
                  <Stage note="A finite visual alphabet">Code IDs</Stage><Arrow />
                  <Stage note="A new learned lookup table">Visual embedding</Stage><Arrow />
                  <Stage note="Continuous input vectors" accent>LLM</Stage>
                </div>
                <div className="route-label second-route-label">Reuse a semantic representation</div>
                <div className="route-flow route-flow-five">
                  <Stage note="The same discrete targets">Code IDs</Stage><Arrow />
                  <Stage note="Vectors for reconstruction">Codebook</Stage><Arrow />
                  <Stage note="Pretrained semantic features">Token encoder</Stage><Arrow />
                  <Stage note="Map into the LLM space">Projector</Stage><Arrow />
                  <Stage note="Continuous input vectors" accent>LLM</Stage>
                </div>
                <figcaption><span>Figure 1.</span> Two input interfaces for a discrete visual alphabet. Feature reuse separates the reconstruction codebook, semantic encoding, and projection into the LLM’s input space.</figcaption>
              </figure>
              <p>The appeal of feature reuse is parameter sharing. With a direct table, the input vector is selected by code identity. With a projector, occurrences of many codes contribute to a shared mapping from an already structured feature space. Semantic pretraining supplies useful relationships between those inputs, so multimodal training can focus on adapting them to the LLM. The output distribution over image codes remains a separate learning problem.</p>
              <p>This input path can be understood as an embedding function. When each code vector is transformed independently, the composed mapping behaves like a static table. When the token encoder uses context, the same code acquires different features in different prefixes. Contextual encoding therefore adds a capability that a code-ID lookup alone cannot express.</p>
              <p>Continuous input features do not remove discrete generation targets. The LLM can read a projected semantic vector and still predict the next image-code ID through an output head. After generation, the visual decoder receives the completed code sequence in its expected representation.</p>
              <p>In the single-codebook case, adding visual IDs to the output vocabulary is a natural implementation. Multi-codebook tokenizers need a little more care: code grouping, prediction order, and possibly a separate depth-wise head become part of the interface. UniTok, for example, groups codes at an image position and uses a depth Transformer for their prediction.<Cite n={7} /> A large combinatorial code space need not become one enormous flat softmax.</p>
              <p>The finite visual alphabet makes this design compatible with categorical next-token prediction. Models that generate continuous visual representations use other output interfaces, such as regression or generative heads. The input representation and the prediction target are two independent architectural choices.</p>
            </section>

            <section id="causality">
              <h2>4. The causal constraint</h2>
              <p>Reusing a semantic encoder looks simple when the complete image is available. Generation changes the conditions: at step <var>t</var>, only the prompt and earlier image codes are available. A semantic representation used to predict the next code must respect that boundary.</p>
              <figure className="prefix-figure">
                <div className="prefix-row"><span className="prefix-label">Available prefix</span><div className="code-sequence"><span>text</span><span>begin image</span><span>z₁</span><span>z₂</span><span className="next-code">z₃ ?</span><span className="future-code">z₄</span><span className="future-code">…</span></div></div>
                <div className="prefix-rule"><strong>To predict z₃:</strong> compute features from the available prefix. Future image codes must not enter that computation.</div>
                <figcaption><span>Figure 2.</span> Causality has to hold across the whole input path, including the semantic token encoder. An LLM attention mask alone cannot repair information leaked before the LLM.</figcaption>
              </figure>
              <p>Suppose full-image features are computed with bidirectional attention during teacher-forced training, then fed to a causally masked LLM. An apparently earlier feature may already contain information about later image codes. The training computation can therefore expose targets that will be unavailable during sampling. TokLIP explicitly uses a causal token encoder to make this interface compatible with autoregressive modeling.<Cite n={6} /></p>
              <p><em>Prefix invariance</em> provides a direct implementation test: hold a code prefix fixed, vary its future suffix, and compare the features for the prefix. In a deterministic causal encoder, they agree up to numerical error. Encoding the prefix alone should produce the same features when positions and special tokens are consistent.</p>
              <p>This has consequences for caching. If extending the prefix changes the representation of earlier positions, keeping their old LLM key/value cache entries can become inconsistent with recomputing the full input. A compatible causal feature path makes incremental decoding much easier to reason about.</p>
              <p>The visual decoder is a separate matter. It may decode the whole completed image sequence at once. The causal restriction concerns information used to predict an unknown code; it does not require the final image decoder to reconstruct pixels one at a time.</p>
            </section>

            <section id="training-signals">
              <h2>5. What trains the visual interface?</h2>
              <p>Understanding and generation both train the visual input interface. An image-to-text example uses visual features to predict an answer. A text-to-image example uses earlier visual features to predict later image codes:</p>
              <div className="article-equation" role="img" aria-label="Text-to-image loss is the negative sum of log probabilities of each image code given text and the preceding image codes.">
                <span><var>L</var><sub>T2I</sub> = −∑<sub>t</sub> log <var>p</var><sub>θ</sub>(<var>z</var><sub>t</sub> | text, <var>z</var><sub>&lt;t</sub>)</span>
              </div>
              <p>When an earlier code is embedded through a trainable projector, later image-token losses backpropagate through the LLM to that projector. The first visual prediction is conditioned on text; subsequent predictions also train through the visual prefix. The two tasks supply different supervision to the same input path.</p>
              <p>A generation-only batch makes this gradient path easy to inspect. Check the projector’s trainable parameters, optimizer membership, and gradients after backward. The tokenizer can remain frozen while its downstream projector learns; the projected vectors must stay connected to the loss computation.</p>

              <h3>Task frequency and data coverage</h3>
              <p>An image-to-text / text-to-image ratio of 9:1 allocates one tenth of the sampled task instances to generation. The same image–text pair can still appear in both directions over training. Unique-pair coverage follows from the dataset construction and sampling policy; task frequency follows from the mixture ratio.</p>
              <p>The loss accounting matters just as much. One image can contribute hundreds of target codes, while an answer may contain relatively few text tokens. A sampler ratio, a loss coefficient, and a ratio of supervised tokens are different quantities. Logging examples, valid target tokens, and loss normalizations for each direction reveals the effective balance of the mixture.</p>

              <h3>Feature width and information</h3>
              <p>In the experiments behind these notes, tokenizers exposing 32- or 40-dimensional features were difficult to turn into useful MLLMs, despite contrastive training. Understanding this result requires looking at codebook capacity, supervision, normalization, and the feature extraction point alongside width. A controlled comparison varies width while keeping those factors fixed.</p>
              <p>A low-dimensional code can feed a much wider semantic encoder, whose contextual computation makes information across the code sequence easier to use. Simply widening a vector with a projection serves a different purpose: it changes the interface dimension. Feature quality comes from the information retained and the transformations learned before the LLM receives it.</p>
            </section>

            <section id="debugging">
              <h2>6. Before scaling the experiment</h2>
              <p>In our early runs with roughly 2.5 million image–text pairs, tokenizer reconstructions were substantially better than images decoded from teacher-forced next-code predictions. Separating the codec, sequence model, and sampling procedure gives a useful way to investigate that gap.</p>
              <p>Teacher forcing predicts each position from a <em>ground-truth</em> prefix. Concatenating those predictions produces a composite assembled from different ground-truth histories. Autoregressive sampling instead conditions each prediction on the codes already generated. Teacher-forced likelihood measures fitting under known histories; free-running samples show how the model behaves under its own histories.</p>
              <p>A practical debugging sequence is:</p>
              <div className="article-table-wrap">
                <table className="debug-table">
                  <thead><tr><th>Check</th><th>What it tests</th></tr></thead>
                  <tbody>
                    <tr><td>Decode ground-truth codes</td><td>Tokenizer/decoder compatibility, code order, spatial shape, and preprocessing.</td></tr>
                    <tr><td>Inspect shifted targets</td><td>Vocabulary offsets, next-token alignment, image boundaries, padding, and valid loss masks.</td></tr>
                    <tr><td>Overfit a tiny fixed set</td><td>Whether the trainable input path, LLM, and output head can fit the task at all.</td></tr>
                    <tr><td>Measure teacher-forced likelihood</td><td>Per-image-token NLL, top-k accuracy, and their variation across image positions.</td></tr>
                    <tr><td>Test prefix consistency</td><td>Causal feature extraction and agreement between training and incremental decoding.</td></tr>
                    <tr><td>Sample autoregressively</td><td>Behavior under self-generated prefixes, after the preceding interfaces are checked.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Ground-truth reconstruction establishes the visual decoder’s baseline. Overfitting a tiny fixed set then isolates the learning path: the input interface, language model, and output head have to fit a controlled collection of examples together. This small experiment localizes failures much faster than another large training run.</p>
              <p>For likelihood, averages can conceal structure. Loss may be concentrated near image boundaries, at particular spatial positions, or among specific sub-codebooks. Frequent-code baselines and code-usage statistics also help interpret accuracy. A single overall loss curve is a poor substitute for knowing which targets the model is actually learning.</p>
              <p>Compare free-running sampling against teacher-forced metrics. Weak results in both point the investigation toward fitting and the interface. Improving teacher-forced likelihood with poor free-running images shifts attention toward train–inference consistency, conditional uncertainty, decoding choices, and accumulated prediction errors.</p>
            </section>

            <section id="what-to-keep">
              <h2>7. Putting the interfaces together</h2>
              <p>A unified model connects four pieces: a decodable visual alphabet, a semantic input representation, a predictor over image codes, and a causal computation for growing prefixes. The tokenizer determines the first two; the language model and its output interface learn the third; the complete data path must support the fourth.</p>
              <p>Writing down those interfaces makes the design concrete. Track the target IDs, the vectors entering the LLM, the source of semantic supervision, and the parameters updated by each loss. Test reconstruction, tiny-set fitting, and prefix consistency. With these pieces in place, changes in data mixture and training scale become much easier to interpret.</p>
            </section>

            <section id="references" className="article-references">
              <h2>References</h2>
              <ol>
                <li id="reference-1">Aaron van den Oord, Oriol Vinyals, and Koray Kavukcuoglu. <a href="https://arxiv.org/abs/1711.00937" target="_blank" rel="noreferrer">Neural Discrete Representation Learning.</a> 2017.</li>
                <li id="reference-2">Patrick Esser, Robin Rombach, and Björn Ommer. <a href="https://arxiv.org/abs/2012.09841" target="_blank" rel="noreferrer">Taming Transformers for High-Resolution Image Synthesis.</a> 2021.</li>
                <li id="reference-3">Chameleon Team. <a href="https://arxiv.org/abs/2405.09818" target="_blank" rel="noreferrer">Chameleon: Mixed-Modal Early-Fusion Foundation Models.</a> 2024.</li>
                <li id="reference-4">Alec Radford et al. <a href="https://arxiv.org/abs/2103.00020" target="_blank" rel="noreferrer">Learning Transferable Visual Models From Natural Language Supervision.</a> 2021.</li>
                <li id="reference-5">Yecheng Wu et al. <a href="https://arxiv.org/abs/2409.04429" target="_blank" rel="noreferrer">VILA-U: a Unified Foundation Model Integrating Visual Understanding and Generation.</a> 2024.</li>
                <li id="reference-6">Haokun Lin et al. <a href="https://arxiv.org/abs/2505.05422" target="_blank" rel="noreferrer">TokLIP: Marry Visual Tokens to CLIP for Multimodal Comprehension and Generation.</a> 2025. <a href="https://github.com/TencentARC/TokLIP" target="_blank" rel="noreferrer">Code.</a></li>
                <li id="reference-7">Chuofan Ma et al. <a href="https://arxiv.org/abs/2502.20321" target="_blank" rel="noreferrer">UniTok: A Unified Tokenizer for Visual Generation and Understanding.</a> 2025. <a href="https://github.com/FoundationVision/UniTok" target="_blank" rel="noreferrer">Code.</a></li>
              </ol>
            </section>
            <footer className="article-footer"><a href="/blogs/">← Back to Blogs</a><a href="/">Jun-Tao Tang</a></footer>
          </div>
        </article>
      </div>
    </main>
  );
}
