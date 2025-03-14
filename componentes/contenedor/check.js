export function handleCheckbox(checkbox, label, div) {
   
    const LabelStyle = () => {
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
        } else {
            label.style.textDecoration = "none";
        }
    };

    if (checkbox && label && div) {
        LabelStyle();
        checkbox.addEventListener('change', LabelStyle);
        div.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            LabelStyle();  
        });

        div.addEventListener('mouseover', () => {
            label.style.textDecoration = "line-through";
        });

       
        div.addEventListener('mouseout', () => {
            if (!checkbox.checked) {
                label.style.textDecoration = "none";
            }
        });
    } else {
        console.error('Uno o más elementos no están definidos.');
    }
}