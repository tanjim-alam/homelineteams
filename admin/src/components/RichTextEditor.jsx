import { useState, useRef, useEffect } from 'react'

export default function RichTextEditor({ value, onChange, placeholder, rows = 8 }) {
    const [isPreview, setIsPreview] = useState(false)
    const textareaRef = useRef(null)

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [value])

    const handleChange = (e) => {
        onChange(e.target.value)
    }

    const insertTag = (tag) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = value
        const before = text.substring(0, start)
        const selection = text.substring(start, end)
        const after = text.substring(end)

        let newText = ''
        let newCursorPos = start

        switch (tag) {
            case 'h1':
                newText = before + '<h1>' + selection + '</h1>' + after
                newCursorPos = start + 4 + selection.length + 5
                break
            case 'h2':
                newText = before + '<h2>' + selection + '</h2>' + after
                newCursorPos = start + 4 + selection.length + 5
                break
            case 'h3':
                newText = before + '<h3>' + selection + '</h3>' + after
                newCursorPos = start + 4 + selection.length + 5
                break
            case 'p':
                newText = before + '<p>' + selection + '</p>' + after
                newCursorPos = start + 3 + selection.length + 4
                break
            case 'strong':
                newText = before + '<strong>' + selection + '</strong>' + after
                newCursorPos = start + 8 + selection.length + 9
                break
            case 'em':
                newText = before + '<em>' + selection + '</em>' + after
                newCursorPos = start + 4 + selection.length + 5
                break
            case 'ul':
                newText = before + '<ul>\n  <li>' + selection + '</li>\n</ul>' + after
                newCursorPos = start + 8 + selection.length + 9
                break
            case 'ol':
                newText = before + '<ol>\n  <li>' + selection + '</li>\n</ol>' + after
                newCursorPos = start + 8 + selection.length + 9
                break
            case 'br':
                newText = before + '<br>' + after
                newCursorPos = start + 4
                break
            case 'hr':
                newText = before + '<hr>' + after
                newCursorPos = start + 4
                break
            default:
                return
        }

        onChange(newText)

        // Set cursor position after a short delay to ensure DOM is updated
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
                textareaRef.current.focus()
            }
        }, 10)
    }

    const formatText = (format) => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = value
        const before = text.substring(0, start)
        const selection = text.substring(start, end)
        const after = text.substring(end)

        let newText = ''
        let newCursorPos = start

        switch (format) {
            case 'uppercase':
                newText = before + selection.toUpperCase() + after
                newCursorPos = start + selection.length
                break
            case 'lowercase':
                newText = before + selection.toLowerCase() + after
                newCursorPos = start + selection.length
                break
            case 'capitalize':
                newText = before + selection.replace(/\b\w/g, l => l.toUpperCase()) + after
                newCursorPos = start + selection.length
                break
            case 'trim':
                newText = before + selection.trim() + after
                newCursorPos = start + selection.trim().length
                break
            default:
                return
        }

        onChange(newText)

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
                textareaRef.current.focus()
            }
        }, 10)
    }

    return (
        <div className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-700 mr-2">Tags:</span>
                    <button
                        type="button"
                        onClick={() => insertTag('h1')}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        onClick={() => insertTag('h2')}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => insertTag('h3')}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                        title="Heading 3"
                    >
                        H3
                    </button>
                    <button
                        type="button"
                        onClick={() => insertTag('p')}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                        title="Paragraph"
                    >
                        P
                    </button>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-700 mr-2">Format:</span>
                    <button
                        type="button"
                        onClick={() => insertTag('strong')}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                        title="Bold"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        type="button"
                        onClick={() => insertTag('em')}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                        title="Italic"
                    >
                        <em>I</em>
                    </button>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-700 mr-2">Lists:</span>
                    <button
                        type="button"
                        onClick={() => insertTag('ul')}
                        className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
                        title="Unordered List"
                    >
                        • List
                    </button>
                    <button
                        type="button"
                        onClick={() => insertTag('ol')}
                        className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
                        title="Ordered List"
                    >
                        1. List
                    </button>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-700 mr-2">Other:</span>
                    <button
                        type="button"
                        onClick={() => insertTag('br')}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                        title="Line Break"
                    >
                        BR
                    </button>
                    <button
                        type="button"
                        onClick={() => insertTag('hr')}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
                        title="Horizontal Rule"
                    >
                        HR
                    </button>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-700 mr-2">Text:</span>
                    <button
                        type="button"
                        onClick={() => formatText('uppercase')}
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                        title="Uppercase"
                    >
                        Aa
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('lowercase')}
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                        title="Lowercase"
                    >
                        aa
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('capitalize')}
                        className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                        title="Capitalize"
                    >
                        Aa
                    </button>
                </div>
            </div>

            {/* Toggle Preview */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                    {isPreview ? 'Edit Mode' : 'Preview Mode'}
                </button>
            </div>

            {/* Editor/Preview */}
            {isPreview ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[200px]">
                    <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">No content to preview</p>' }}
                    />
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    rows={rows}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                    placeholder={placeholder}
                />
            )}

            {/* Character Count */}
            <div className="text-xs text-gray-500 text-right">
                {value?.length || 0} characters
            </div>
        </div>
    )
}
