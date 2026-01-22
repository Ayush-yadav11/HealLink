## 2024-05-22 - [Component Definition Inside Render Loop]
**Learning:** Defining components inside another component's render body (e.g. `const Header = () => ...` inside `RemoteDoctor`) causes the inner component to be re-created and re-mounted on every render of the parent. This hurts performance and focus management.
**Action:** Always define components at the top level of the module or in separate files.
