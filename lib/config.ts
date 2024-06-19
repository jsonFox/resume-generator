type BuilderConfig = {
  /** Enable/disable logging */
  logging: boolean;
  /** If first/last name is multiple words, split at that point
   *
   *  `first`: Jennifer Cordero Alvarez => Cordero Alvarez, Jennifer
   *
   *  `last`: Jennifer Cordero Alvarez => Alverez, Jennifer Cordero
   */
  splitNameAt: 'first' | 'last';
};

export const builderConfig = {
  logging: true,
  splitNameAt: 'first'
} as BuilderConfig;
