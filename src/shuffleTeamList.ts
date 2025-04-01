export function shuffleTeamList(array: string[], times: number = 3): string[] {
  function shuffle(array: string[]): string[] {
    return [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const result: string[] = [];
  let previousArray: string[] = [];

  for (let i = 0; i < times; i++) {
    let currentArray = shuffle(array);
    while (
      previousArray.length > 0 &&
      previousArray[previousArray.length - 1] === currentArray[0]
    ) {
      currentArray = shuffle(array);
    }
    result.push(...currentArray);
    previousArray = currentArray;
  }

  return result;
}
