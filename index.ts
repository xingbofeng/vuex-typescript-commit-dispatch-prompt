type GetRestFuncType<T> = T extends (context: any, ...params: infer P) => infer R ? (...args: P) => R : never;

type AddPrefix<Keys, Prefix = ''> = `${Prefix & string}${Prefix extends '' ? '' : '/'}${Keys & string}`;

type GetMutationsTypes<Module, ModuleName = ''> = Module extends { mutations: infer M } ? {
    [MutationKey in keyof M as AddPrefix<MutationKey, ModuleName>]: GetRestFuncType<M[MutationKey]>
} : never;

type GetActionsTypes<Module, ModuleName = ''> = Module extends { actions: infer M } ? {
    [ActionKey in keyof M as AddPrefix<ActionKey, ModuleName>]: GetRestFuncType<M[ActionKey]>
} : never;

type GetModulesMutationTypes<Modules> = {
    [K in keyof Modules]: GetMutationsTypes<Modules[K], K>
}[keyof Modules];

type GetModulesActionTypes<Modules> = {
    [K in keyof Modules]: GetActionsTypes<Modules[K], K>
}[keyof Modules];

type GetSubModuleMutationsTypes<Module> = Module extends { modules: infer SubModules } ? GetModulesMutationTypes<SubModules> : never;

type GetSubModuleActionsTypes<Module> = Module extends { modules: infer SubModules } ? GetModulesActionTypes<SubModules> : never;

type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (k: infer I) => void ? I : never;

type GetTypeOfKey<T, K extends keyof T> = {
    [Key in keyof T]: K extends keyof T ? T[K] : never;
}[keyof T];

type GetParam<T> =
    T extends () => any ? undefined :
    T extends (arg: infer R) => any ? R : any;

type ReturnType<T> = T extends (...args: any) => infer R ? R : any;

export type GetMutationsType<R> = UnionToIntersection<GetSubModuleMutationsTypes<R> | GetMutationsTypes<R>>;

export type GetActionsType<R> = UnionToIntersection<GetSubModuleActionsTypes<R> | GetActionsTypes<R>>;

export type GetPayLoad<T, K extends keyof T> = GetParam<GetTypeOfKey<T, K>>;

export type GetReturnType<T, K extends keyof T> = ReturnType<GetTypeOfKey<T, K>>;

/** state */
type GetStateTypes<Module> = Module extends { state: () => infer R }
  ? R
  : Module extends { state: infer M }
  ? {
      [key in keyof M]: M[key]
    }
  : unknown
export type GetModuleStateTypes<Module> = Module extends { modules: infer SubModules } ? GetModulesStateTypes<SubModules> : unknown
export type GetModulesStateTypes<Modules> = {
  [K in keyof Modules]: GetStateTypes<Modules[K]> & GetModuleStateTypes<Modules[K]>
}

export type GetStateType<T> = GetStateTypes<T> & GetModuleStateTypes<T>