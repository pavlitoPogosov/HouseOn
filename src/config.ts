function env<T = string | undefined>(variable: string | undefined, defaultValue?: T) {
  if (typeof variable === 'undefined') {
    return defaultValue;
  }
  return variable;
}

function requireEnv(variable: string | undefined, name: string) {
  if (typeof variable === 'undefined') {
    throw new Error(`Variable ${name} is required`);
  }
  return variable;
}

export const configVariable = env(process.env.REACT_APP_CONFIG_VARIABLE);
export const apiGraphqlUrl = requireEnv(process.env.REACT_APP_GRAPHQL_API, 'GRAPHQL_API');
export const apiAuthUrl = requireEnv(process.env.REACT_APP_AUTH_API, 'REACT_APP_AUTH_API');

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};
