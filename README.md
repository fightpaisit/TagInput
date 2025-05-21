First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

TagInput Component Props
[tags] ==> set initial tag
[onChange] ==> emit data when user add/remove tag
[placeholder][optional] ==> set customize place holder
[maxTags][optional] ==> set allow number of max tag
[allowDuplicates][optional] ==> set allow duplicate tag
[onInputChange][optional] ==> emit data when tag is changed
[onFocus][optional] ==> use when field is touched
[onBlur][optional] ==> use when field is untouched
[seperator][optional] ==> it's a customize delimiter eg. Enter, Comma etc.
