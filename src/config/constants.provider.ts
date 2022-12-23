export const ConstantProviders = [
  {
    provide: 'JWT',
    useValue: {
      JWT_TOKEN: `jwt`,
      JWT_REFRESH_TOKEN: `jwt-refresh-token`,
    }
  },
];