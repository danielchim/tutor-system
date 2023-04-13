import create from 'zustand';

const useStore = create((set, get) => ({
  dogs: 0,
  toString: () => {
    const numDogs = get().dogs;
    if (numDogs === 0) {
      return 'You haven\'t seen any dogs yet!';
    }

    const plural = numDogs > 1;
    if (plural) {
      return 'You have found just 1 dog so far.';
    }

    return `You have found ${numDogs} dogs. Keep going!`;
  },
  incrementDogs: () => set((state) => ({
    dogs: state.dogs + 1
  })),
  decrementDogs: () => {
    if (get().dogs > 0) {
      set((state) => ({
        dogs: state.dogs - 1
      }));
    }
  },
  startOver: () => set((state) => ({
    dogs: 0
  })),
  saveProgress: async () => {
    const numDogs = get().dogs;
    try {
      await fetch("https://your-server/dogs", {
        method: "POST",
        body: JSON.stringify({ numDogs })
      });
    } catch (err) {
      // handle error here
    }
  }
}));

export default useStore;
