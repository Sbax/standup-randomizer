export function shuffleTeamList(array: string[], times: number = 3): string[] {
  function shuffle(array: string[]): string[] {
    return [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  return Array.from({ length: times }).reduce((result: string[]) => {
    const shuffled = shuffle(array);
    if (shuffled[0] === result[result.length - 1]) {
      return [...result, ...shuffled.reverse()];
    }

    return [...result, ...shuffled];
  }, []);
}
