export function shuffleTeamList(teamList: string[]): string[] {
  function shuffle(array: string[]): string[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const combinedList = [...teamList, ...teamList, ...teamList];
  const shuffledList = shuffle(combinedList);

  // Ensure no consecutive duplicates
  return shuffledList.reduce<string[]>((result, current) => {
    if (result.length === 0 || result[result.length - 1] !== current) {
      result.push(current);
    } else {
      // Find a non-duplicate element to swap
      const swapIndex = result.findIndex((item) => item !== current);
      if (swapIndex !== -1) {
        [result[swapIndex], current] = [current, result[swapIndex]];
      }
      result.push(current);
    }
    return result;
  }, []);
}
