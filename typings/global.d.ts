declare type RecordAny = Record<string, any>;
declare type RecordNever = Record<never, never>;
declare type RecordAnyOrNever = Record<any, never>;

/* 
基础类型接口
*/
declare type BaseType = string | number | boolean | null | undefined;

/* 类转义为普通对象后的类型 */
declare type ClassToPlain<T> = { [key in keyof T]: T[key] };

/* 嵌套对象全部可选 */
declare type RePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] | undefined
    ? RePartial<U>[]
    : T[P] extends object | undefined
      ? T[P] extends ((...args: any[]) => any) | ClassToPlain<T[P]> | undefined
        ? T[P]
        : RePartial<T[P]>
      : T[P];
};

/* 嵌套对象全部必选 */
declare type ReRequired<T> = {
  [P in keyof T]: T[P] extends (infer U)[] | undefined
    ? ReRequired<U>[]
    : T[P] extends object | undefined
      ? T[P] extends ((...args: any[]) => any) | ClassToPlain<T[P]> | undefined
        ? T[P]
        : ReRequired<T[P]>
      : T[P];
};

/* 防止SWC下循环报错 */
declare type WrapperType<T> = T;
