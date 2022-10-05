/** @type { import("../../types/ChapterConstructor").ChapterConstructor } */
const Chapter = {
    description: "[NO SIGNAL]",
    stages: [
        {
            Symbol: "A1-1",
            Difficulty: 1.1,
            Title: "A New Beginning?",
            Description: "Make 23",
            Goal: ["23"],
            Items: [
                [
                    ["number", { symbol: 1 }],
                    ["number", { symbol: 2 }],
                    ["number", { symbol: 4 }],
                    ["number", { symbol: 5 }],
                ],
                [
                    ["operator", { symbol: "!" }],
                    ["operator", { symbol: "+" }],
                ],
            ],
        },
        {
            Symbol: "A1-2",
            Difficulty: 1.8,
            Description: "Make 2763",
            Title: "nΣm",
            Goal: ["22"],
            Items: [
                [
                    ["number", { symbol: 80 }],
                    ["number", { symbol: 50 }],
                    ["number", { symbol: 4 }],
                    ["number", { symbol: 4 }],
                ],
                [
                    ["operator", { symbol: "Σ" }],
                    ["operator", { symbol: "!" }],
                ],
            ],
        }
    ]
};

export default Chapter;
