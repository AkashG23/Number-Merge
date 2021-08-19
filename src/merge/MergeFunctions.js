import MergeField from "./MergeField.js";
import MergeItem from "./MergeItem.js";
import ItemTypes from "./ItemTypes.js";

/** Util Functions */
function removeAll(items) {
    for (var i = 0; i < items.length; i++) MergeField.removeItem(items[i].id);
}

/** Main Functions */
/** @type {Object.<string, function(MergeItem, MergeItem[]): void>} */
const MergeFunctions = {
    Number(mainItem, mergeItems) {
        const mergeables = mergeItems.filter(e => e.hasTag(["number", "operator"]));

        if (mergeables.length === 0) {
            if (mergeItems.length >= 1) this.Term(mainItem, mergeItems);
            return;
        }

        const toMerge = mergeables.slice(0, 1)[0];
        let symbol;
        switch (toMerge.type) {
            case "number":
                symbol = +mainItem.symbol + +toMerge.symbol;
                break;
            case "operator":
                switch(toMerge.symbol) {
                    case "+":
                        symbol = +mainItem.symbol + 1;
                        break;
                    case "-":
                        symbol = +mainItem.symbol - 1;
                        break;
                    case "×":
                        symbol = mainItem.symbol**2;
                        break;
                    case "÷":
                        symbol = 1;
                        break;
                }
                break;
        }
        MergeField.addItem({
            ...ItemTypes.Number(),
            position: mainItem.position,
            symbol
        });
        
        removeAll([mainItem, toMerge]);
    },
    Base(mainItem, mergeItems) {
        
    },
    Operator(mainItem, mergeItems) {
        const mergeables = mergeItems.filter(e => e.hasTag("number"));

        if (mergeables.length === 0) return;

        const toMerge = mergeables.slice(0, 1)[0];
        MergeField.addItem({
            ...ItemTypes.Term(),
            position: mainItem.position,
            symbol: toMerge.symbol + mainItem.symbol
        });
        
        removeAll([mainItem, toMerge]);
    },
    Term(mainItem, mergeItems) {
        const mergeables = mergeItems.filter(e => e.hasTag("number"));

        if (mergeables.length === 0) return;

        const toMerge = mergeables.slice(0, 1)[0];

        const [number, operator] = mainItem.symbol.split("");

        let symbol;
        switch (operator) {
            case "+":
                symbol = +number + +toMerge.symbol;
                break;
            case "-":
                symbol = +number - +toMerge.symbol;
                break;
            case "×":
                symbol = number * toMerge.symbol;
                break;
            case "÷":
                symbol = Math.floor(number / toMerge.symbol);
                break;
        }

        MergeField.addItem({
            ...ItemTypes.Number(),
            position: mainItem.position,
            symbol
        });
        
        removeAll([mainItem, toMerge]);
    }
};
export default MergeFunctions;