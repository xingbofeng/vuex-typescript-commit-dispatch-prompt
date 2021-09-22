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

type TstoreOptions = typeof vuexOptions

type Mutations = GetMutationsType<typeof TstoreOptions>;

type Actions = GetActionsType<typeof TstoreOptions>;

type TState = GetStateType<TstoreOptions>

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

[state demo](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwGVgENgQCrggZwDwFkB7AEwFcAbCAPigF4oAoKZl5osyqCADzQDti2KAG8o2FGgBcUABQBKOjQCWfAGYQATlABKUAL5NWR5gH4dUaTPYVoPfoJFiJEaSvVb8+w8Z9QzwgG0AawgQKBUoEJBCVSh8AF1pfGDQ+INfVmlSPiC+QgB3PjkAbgYGUEhYeGtKJFQMLDwa6jo4khsuXggBIVEAW3bKbFc1TSgEUgAjZqE9PyrgGbq0TEg8CenBnBosnLzC0oYeMEINYCgK6DhFrexlhrWCW5p6YW8oAIBpcL5I0Ji2hwcIkFvdVjgnkDsF94jQAGQLZpgxqQmzQz6whgGI7cE5nC5YUHOcG4dAvIn1cF4MlQBHXJHElE0gD0zMcXx+f2isXQIO+dm6DgA5AMoUL5vTbsjHugYTsoPyuj0oELxPVxWZrtKITTpHwIAA3MZ6FLcqC8soMADGhD44icp2gr3eaqksgUtBoMjevj4yD6LhVfoDQoANO89HJw6xRWjpD6fMQIAN4+9ff6cGBkFaIMRpMANKQINGMsxXYH5IpZAnS6wABYQcjkQjSIUNpuEIVpnyRkulvqkCRKW3DETd0tocSVt7jjLpWt6PsZWNDVO1oyUI3kADMa-XPnLe-3GXyp3IeZVp40567x+M8+PD7ns6fi-e2eAw7tR6MqmyVunMpfFfLFykJdB7laLVGUgXBLgBcRHSoMpLnNe4ACZWhrKBg0DcQNBUABzUo5jpaopRgiFsKTFMx3TANsCzHML0mQhCEoZA+FKXxD3dKtsN8dtm2kfCiO4ntxOMAchxHH9fEnYB5GkA1CCUYhJKMPQNJjW45J8TdG13Oi714gS7yvc8RILMTZ2A7SJJfDStKxZDrRHc5SGwCAkEdVolLQ5xMM9YzmA0eBSA0X4zOYXDWwARjDWcaJbEKMiElKhW3LLEvXAydz00sLIvTKsuy2yWCfVgQIMG07XOHywtaTzvOAR15Dcu12IgAA6ZtCJkBqetwuQOuwLresIfrBu65LuvSkbarGygJqm1qwpm5NCF6w1DO6oq5CAA)
