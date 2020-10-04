# vuex-typescript-commit-dispatch-prompt
vuex-typescript-commit-dispatch-prompt is a tool for vuex and TypeScript 4.1+。

## Start

```
npm install typescript@beta --save-dev
npm i vuex-typescript-commit-dispatch-prompt --save
```

then modify your store.ts

```TypeScript
import { GetActionsType, GetMutationsType, GetTypeOfKey } from 'vuex-typescript-commit-dispatch-prompt';

const vuexOptions = {
    state,
    getters,
    actions,
    mutations,
    modules: {
        detail,
        report,
        meeting,
        scientificManage,
    },
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
};

type Mutations = GetMutationsType<typeof vuexOptions>;

type Actions = GetActionsType<typeof vuexOptions>;

declare module 'vuex' {
    export interface Commit {
        <T extends keyof Mutations>(type: T, payload?: Parameters<GetTypeOfKey<Mutations, T>>, options?: CommitOptions): ReturnType<GetTypeOfKey<Mutations, T>>;
    }
    export interface Dispatch {
        <T extends keyof Actions>(type: T, payload?: Parameters<GetTypeOfKey<Actions, T>>, options?: DispatchOptions): Promise<ReturnType<GetTypeOfKey<Actions, T>>>;
    }
}
```

## Reading
[TypeScript 4.1 类型模板字符串实现Vuex的store.commit和store.dispatch类型判断](https://github.com/xingbofeng/xingbofeng.github.io/issues/54)
