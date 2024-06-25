export type FontDefinition = {
  package: string;
  familyDefault?: string;
};

export const SERIF: Record<string, FontDefinition> = {
  cormorantGaramond: {
    package: 'CormorantGaramond'
  },
  charter: {
    package: 'charter'
  }
};

export const SANS_SERIF: Record<string, FontDefinition> = {
  roboto: {
    package: 'roboto',
    familyDefault: 'sfdefault'
  },
  firaSans: {
    package: 'FiraSans',
    familyDefault: 'sfdefault'
  },
  notoSans: {
    package: 'noto-sans',
    familyDefault: 'sfdefault'
  },
  sourceSansPro: {
    package: 'sourcesanspro',
    familyDefault: 'default'
  }
};
