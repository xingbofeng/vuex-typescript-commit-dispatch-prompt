# vuex-typescript-commit-dispatch-prompt
vuex-typescript-commit-dispatch-prompt is a tool for vuex and TypeScript 4.1+。

## Start

```
npm install typescript@beta --save-dev
npm i vuex-typescript-commit-dispatch-prompt --save
```

then modify your store.ts

```TypeScript
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { GetActionsType, GetMutationsType, GetPayLoad, GetReturnType } from 'vuex-typescript-commit-dispatch-prompt';

const vuexOptions = {
    state,
    getters,
    actions,
    mutations,
    modules: {
        home,
        detail,
    },
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
};

type Mutations = GetMutationsType<typeof vuexOptions>;

type Actions = GetActionsType<typeof vuexOptions>;

declare module 'vuex' {
    export interface Commit {
        <T extends keyof Mutations>(type: T, payload?: GetPayLoad<Mutations, T>, options?: CommitOptions): GetReturnType<Mutations, T>;
    }
    export interface Dispatch {
        <T extends keyof Actions>(type: T, payload?: GetPayLoad<Actions, T>, options?: DispatchOptions): Promise<GetReturnType<Actions, T>>;
    }
}

const store = new Vuex.Store<RootState>(vuexOptions);
```

## Reading
[TypeScript 4.1 类型模板字符串实现Vuex的store.commit和store.dispatch类型判断](https://github.com/xingbofeng/xingbofeng.github.io/issues/54)
