export default function useText() {

    function truncateText(text: string, maxLength: number) {
        if (text && text.length > maxLength) {
            return text.slice(0, maxLength) + '...'
        }
        return text
    }

    return {
        truncateText
    }
}