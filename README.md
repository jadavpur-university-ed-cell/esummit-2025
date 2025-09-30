# E-SUMMIT 2025 WEBSITE:

### //TODO s:
- [ ] Move all Prisma Client to one directory and one object call only (no multiple calls and API overloading)

### Features Missing:
- UI for login and routing post OAuth 2.0
- Data in Events
- mobile friendly view
- api consummation @frontend

### Known Issues:

_[Branch] - pkg_

```
./app/(routes)/admin/teams/[eventName]/ExportCSV.tsx
4:40  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
24:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./app/(routes)/admin/teams/[eventName]/Teams.tsx
10:52  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
60:74  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
63:37  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
68:37  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
84:43  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
178:22  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./app/(routes)/admin/teams/[eventName]/page.tsx
5:32  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./components/merchandise/MerchandiseCSR.tsx
172:56  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
213:44  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
```