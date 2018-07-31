# fiddle

### osc sequencer application

fiddle will be a modern sequencer application specializing in arranging OSC data on a timeline. fiddle is pre-alpha software, and is a proof of concept for writing a performant web-based sequencer application using React, typescript, and an architecture centered around observable data.

```bash
$ yarn            # https://yarnpkg.com

$ yarn dev:web    # Run dev mode in browser
# or
$ yarn storybook  # Run storybook component playground
# or
$ yarn dev        # Build run electron
```

#### Roadmap to v0.1

- [ ] Implement a simple grid-based clip / timeline positioning system
- [ ] Implement a simple clip-based parameter automation system
- [ ] Implement a bridge layer between the JS view process and C++ OSC engine
