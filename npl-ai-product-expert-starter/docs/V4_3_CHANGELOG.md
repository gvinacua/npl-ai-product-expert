# v4.3 Changelog

## Purpose
v4.3 embeds the quality rules directly into each app mode so the user no longer needs to write long prompts to get strong outputs.

## Main changes

1. Added embedded quality defaults across all modes:
   - concise by default;
   - financial-services specificity;
   - source-grounded examples when relevant;
   - no invented named company cases;
   - claims-to-verify discipline;
   - known / emerging / speculative / vendor-claim labeling;
   - product/risk/governance implications;
   - NPL point-of-view development.

2. Added new mode: Source-Grounded Lesson Builder.
   - For client-facing lessons.
   - Identifies examples/sources first.
   - Builds a lesson around verified or clearly labelled examples.
   - Includes claims to verify.

3. Added new mode: Point-of-View Builder.
   - Compares mainstream, contrarian, product, risk/compliance and adoption views.
   - Produces a provisional NPL position.
   - Designed for topics where NPL does not yet have a fully settled position.

4. Updated Lesson Delivery Mode.
   - Now requires source discipline and clearly labelled hypothetical examples.
   - Adds an executive tension/debate moment by default.

5. Updated Panel, Sparring, Training, Speaker, Frontier, Research and Audit modes.
   - Each now carries mode-specific quality instructions.

6. Added knowledge pack:
   - `18_mode_quality_and_point_of_view_engine.md`

## How to use
The prompt box should now mostly contain:

- topic;
- audience;
- duration;
- desired tone;
- client context;
- specific nuance or constraint.

The mode should handle the rest.
