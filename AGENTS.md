# Agent instructions

- Educational project for mixed experience levels, with individual work through forks.
- This project lives in the repository root. Run all commands below from this directory.
- Use English for code identifiers, comments, UI text, filenames, repository
  names, executable examples, and commit message examples. Write README files
  and human-facing setup, construction, organization, and instructor guides in
  Brazilian Portuguese. Keep this agent guidance in English.
- Use docs/walkthrough.md as the shared classroom sequence. Give beginners small
  numbered actions, exact files/locations, expected results, recovery steps, and
  checkpoints where everyone waits for the instructor before moving on.
- Preserve the same application logic across students' themes. During the shared
  lesson, customize data and presentation in small steps; finish visual details
  later. Architecture changes are deliberate optional extensions after the
  common path, with an explanation and verification, within the project scope.
- Reuse the teaching sequence and simple structure in future activity starters;
  adapt domain rules consciously. Never describe an unreleased activity as ready.
- This repository is the `1-product-showcase` starter; students can rename their
  forks. Each activity has its own repository. `jonathan-sales-programming` is a
  separate catalog of links. Keep activity source code in its own repository.
- Keep the starter, instructor's personal version, and student forks distinct.
  Catalog and future activity templates are in `docs/examples/`; these are not
  published repositories. See `docs/project-organization.md`.
- Preserve Python + Flask + Jinja + plain HTML/CSS, local images, and simplicity.
- Do not add JavaScript, build tools, or frontend frameworks without an explicit
  request. Do not implement login, a cart, checkout, payments, or a database.
- Preserve all four OOP principles: abstract Product, validated price property,
  inheritance with super(), and polymorphic delivery without template type checks.
- Keep the activity's BRL price format (R$ 59,90) unless a currency change is requested.
- Prefer small, explained changes. Do not publish, configure remotes, or push
  without a request.
- Install: `py -m venv .venv` and
  `.\.venv\Scripts\python.exe -m pip install -r requirements.txt`.
- Run: `.\.venv\Scripts\python.exe -m flask --app app run --debug`.
- Verify: `.\.venv\Scripts\python.exe verify.py`.
