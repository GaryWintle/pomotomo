export const inputButtonVariants = {
  rest: {
    scale: 1,
    boxShadow: `0 1px 0 var(--green-mid), var(--dropshadow-green-shallow)`,
  },
  hover: {
    scale: 1.03,
    backgroundColor: 'var(--green-lightest)',
  },
  tap: {
    scale: 0.95,
    backgroundColor: 'var(--green-lightest)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 60,
      mass: 0.8,
    },
  },
};
