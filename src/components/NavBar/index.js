import React from "react";
import FilterSvg from "../icons/24/FilterSvg";
import LinkButton from "../LinkButton";

import styles from "./index.module.scss";

function NavBar({ children, actions }) {
    //todo check for filters
    return (
        <nav className={styles.NavBar}>
            <div className={styles.MobileMenu}>
                <FilterSvg hasFilter={false} />
            </div>
            <div className={styles.QuickFilters}>{children}</div>
            <div className={styles.Actions}>
                {actions.map((action, index) => {
                    const IconComponent = action.iconComponent;
                    return (
                        <LinkButton
                            key={index}
                            text={action.name}
                            onClick={action.onClick}
                        >
                            <IconComponent />
                        </LinkButton>
                    );
                })}
            </div>
        </nav>
    );
}

export default NavBar;
