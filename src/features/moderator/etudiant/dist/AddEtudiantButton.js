"use client";
"use strict";
exports.__esModule = true;
var EnseignantModal_1 = require("@/src/features/moderator/enseignant/EnseignantModal");
var icon_1 = require("../../ui/icon");
var react_1 = require("react");
function AddEtudiantButton() {
    var _a = react_1.useState(false), showModal = _a[0], setShowModal = _a[1];
    var _b = react_1.useState(false), isNew = _b[0], setIsNew = _b[1];
    var onClose = function () {
        setShowModal(false);
        setIsNew(false);
    };
    var handleClick = function () {
        setShowModal(true);
        setIsNew(true);
    };
    return (React.createElement("div", null,
        React.createElement("button", { className: "flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer", onClick: handleClick },
            React.createElement(icon_1.PlusIcon, null),
            React.createElement("span", { className: "ml-2" }, "Ajouter un enseignant")),
        showModal && React.createElement(EnseignantModal_1["default"], { isNew: isNew, onClose: onClose })));
}
exports["default"] = AddEtudiantButton;
