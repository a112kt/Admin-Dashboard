export function formatOptions(optionsArray: string[]) {
    return optionsArray.map((option) => {
        return {
            value: option,
            label: option,
        };
    });
}
