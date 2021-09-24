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
import { createStore, useStore as baseUseStore } from 'vuex'
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

type TStoreOptions = typeof vuexOptions

type Mutations = GetMutationsType<TStoreOptions>;

type Actions = GetActionsType<TStoreOptions>;

type TState = GetStateType<TStoreOptions>

export const key: InjectionKey<Store<TState>> = Symbol()

declare module 'vuex' {
    export interface Commit {
        <T extends keyof Mutations>(type: T, payload?: GetPayLoad<Mutations, T>, options?: CommitOptions): GetReturnType<Mutations, T>;
    }
    export interface Dispatch {
        <T extends keyof Actions>(type: T, payload?: GetPayLoad<Actions, T>, options?: DispatchOptions): Promise<GetReturnType<Actions, T>>;
    }
}

const store = new Vuex.Store<RootState>(vuexOptions);

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
```

## Reading
[TypeScript 4.1 类型模板字符串实现Vuex的store.commit和store.dispatch类型判断](https://github.com/xingbofeng/xingbofeng.github.io/issues/54)

[state demo](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwGVgENgQCrggZwDwFkB7AEwFcAbCAPigF4AoKJqIsyqCADzQDtjsoAbyjYUaAFxQAFAEo6NAJY8AZhABOUAEpQAvo2YB+LVElTWFaF178hIsRElLVG-Lv3NDtgNoBrCCCglKD8QQmUWAF1JfF9-CLcPD0lSHh8eQgB3HhkAbnp6UEhYeHNKJFQMLDxS6joWEgsObgg+AWEAWwbKbEcVdSgEUgAjGoEdKCM4YFHytExIPEGRrpwaZNT0rLz6LjBCNWAoQugpmft5nAIV7BpaIXcoLwBpQJ5g-zD6thwo4sRzqpXb7YZ4RGgAMj+NVmlQWQIsIKeYPoeh2nD2ByOWD+MIuuHQtxxALhBKgkNOK1xgNJAHoad4XkEQp90L8XlYWjYAOSdYFciZQ65UkmgtZQdnNVpQLmiCr8ybwYWXUmSHgQABu-R0sVC4VZ+XoAGNCDxRHZ9tA7oIHrKJNI5LQaFJrYlmDxkO0HNL3Z6uQAaB46GQBjy8hGSF2uqDECCdCMPKNQH04MDIQ0QYiSYBqUgQEOJ5i2r2yeTSSMFxIACwg5HIhEkXOrtcIXITUaD+Yr7VIYgUJp69wrrrQohL1rbFb0Q90nYLYe68enHkomvIAGZF0vXUXN1vExl9uRM9KD2oj6294kp3vr5OJwlmDpZ2ngH3TbvEsoUoax-lE7e3D0Y4oHQGE6imJVcGOT5RAtKh8mA0D7AAJjqcskw9L1RDUJQAHM8nGckSiFYlLnQmM40HKNk2wVN02PIZCEIShkB4PJEx3e1S3QxMmzrSRsLw9j22E11u17fsP0TEdgFkSR1UIBRiFEq8VNDa4pKjFcaw3Kit04ni91PI8BOzIT73-NSRPvHQVNslF4KNftDlIbAICQC06jk2xOKQipUPGR09KgNR4FINQ3kMpgDIst1MIbABGf1YqYCj62C6c+PSrk11y5LL209dNK3Yzjxy3K8pSq8qoAjwAL0PRjVNQ4PNCupXPc4ALVkJzTWYiAADo61wqRWsGosBuTGReuwfqhsIEaxoGia0oGrLpqa2bKHmxautC5b7AG1bCrXAbSpkIA)
