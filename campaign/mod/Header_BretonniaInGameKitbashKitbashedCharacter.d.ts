

declare namespace BretonniaInGameKitbash {
    /**
     * Opaque Class
     */
    class Character {

    }

    /**
    * Opaque Class
    */
    class Faction {

    }

    type Type = 
    "head"      |
    "cape"      |
    "torso"     |
    "legs"      |
    "mount"     |
    "weapon"    |
    "shield"    |
    "talisman"  ;

    type ArmoryItemToAncillary = {
        [armoryItemKey: string]: string;
    };

    type ArmoryItemToArmoryItems = {
        [armoryItemKey: string]: string[];
    };

    type ArmoryItemToValue = {[armoryItemKey: string]: {
        Powerlevel: number,
        Type: Type
    }};

    type KitbashData = {
        defaultArmorySet: string;
        possibleMounts: ArmoryItemToAncillary;
        specialItems: ArmoryItemToAncillary;
        armouryItemPreferences: ArmoryItemToArmoryItems;
        bCanUseShield: boolean;
    };
    export class KitbashedCharacter extends Character {
        private static EnabledFactions;
        private static CharactersWithEnabledArmoury;
        private static bInited;
        private static CharacterToKitbashData;
        static TryCast(character: Character): KitbashedCharacter | null;
        private static EnableKitbashForCharacter;
        public static RegisterItemValues(armouryToValue: ArmoryItemToValue): void;
        static Register(agentKey: string, kitbashData: KitbashData): void;
        static EnableFaction(factionKey: string): void;
        private constructor();
        IsValidKitbash(): boolean;
        HasValidKitbashConfig(): boolean;
        private EnableKitbash;
        get AncillaryMountKey(): string | null;
        DismountAll(): boolean;
        Mount(armouryItemKeyMount: string): boolean;
        IsArmouryItemKeyMount(armoryItemKeyMount: string): boolean;
        HasAmouryItemInCharacter(armouryItem: string): boolean;
        HasEquippedItem(itemKey: string): boolean;
        get EquippedArmoryItems(): string[];
        get AvailableArmoryItems(): string[];
        private AssignDefaultArmoryItemForDefaultMount;
        DumpInfo(): void;
        /*******************
         *
         * STATIC METHODS GO HERE:
         *
         *******************/
        static Init(): void;
        static get AvailableFactions(): string[];
        private static Load;
        private static Save;
        private static SetupEventHandlers;
        private static ProcessMountAncillary;
        private static ProcessSpecialAncillary;
        private static CheckForMountChanges;
        private static CheckForDismountChanges;
        private static ArmoryItemEquippedEvent;
        private static ArmouryItemUnequippedEvent;
        private static ReceivedAncillaryEvent;
        static DumpManager(): void;
    }
    export {};
}
