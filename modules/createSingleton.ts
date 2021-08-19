export function createSingleton<T>(name: string, create: () => T): T {
  const sym = Symbol.for(name);
  let scope = (global as any)[sym];
  if (!scope) {
    scope = {...create()};
    (global as any)[sym] = scope;
  }

  return scope;
}