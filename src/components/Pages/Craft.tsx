import Menu from "components/Menu";
import SimpleBar from "simplebar-react";
import "static/stylesheets/simplebar.css";
import Recipes from "components/Recipes";
import { CraftContextProvider } from "components/Contexts/CraftContext";

export default function Craft() {
    // Render
    return (
        <CraftContextProvider>
            <p className="font-bold text-center text-lg p-16 lg:hidden">
                The craft page is currently unavailable for mobile/tablet users. Please use the
                Desktop verison or try again later!
            </p>
            <div className="hidden lg:flex flex-1 basis-96 justify-between gap-x-10 overflow-hidden">
                <SimpleBar className="w-full" autoHide={false}>
                    <Recipes />
                </SimpleBar>
                <Menu />
            </div>
        </CraftContextProvider>
    );
}
