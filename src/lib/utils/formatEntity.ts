export type EntityType =
  | "prompt"
  | "generic"
  | "user"
  | "newsletter-subscriber"
  | "list"
  | "category"
  | "error"
  | "prompt-category"
  | "interaction"
  | "reward"
  | "comment";

export type Entity<T = unknown> = {
  sys: {
    id: number;
    entity: EntityType;
    createdAt?: string;
    updatedAt?: string;
  };
  data: T;
};

export type ErrorEntity = {
  sys: {
    entity: "error";
    createdAt?: string;
    updatedAt?: string;
  };
  error: unknown;
};

export type EntityList<T = unknown> = {
  sys: {
    entity: "list";
    createdAt?: string;
    updatedAt?: string;
  };
  data: Entity<T>[];
};

export const formatEntity = <T extends { id: number }>(
  data: T,
  entity: EntityType,
): Entity<T> => {
  return {
    sys: {
      id: data.id,
      entity,
    },
    data,
  };
};

export const formatEntityList = <T extends { id: number }>(
  data: T[],
  entity: EntityType,
): EntityList<T> => {
  return {
    sys: {
      entity: "list",
    },
    data: data.map((d) => formatEntity(d, entity)),
  };
};

export const formatErrorEntity = <T = unknown>(error: T): ErrorEntity => {
  return {
    sys: {
      entity: "error",
    },
    error,
  };
};
