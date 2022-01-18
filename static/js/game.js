class Interface {
    static Status = class InterfaceStatus {
        static updateStatus() {
            updateElement("status-level", {text:` [${player.ship.level}]`}, false);
            updateElement("status-health", {text:` [${player.ship.health}/${player.ship.maxHealth}]`}, false);
            updateElement("status-health-bar", {value:player.ship.health, max:player.ship.maxHealth}, false);
            updateElement("status-crew", {text:` [${player.ship.crew}]`}, false);
            updateElement("status-food", {text:` [${player.food}]`}, false);
            updateElement("status-wood", {text:` [${player.wood}]`}, false);
            updateElement("status-gold", {text:` [${player.gold}]`});
        }
    }

    static Map = class InterfaceMap {
        static updateMapView(IslandMapping) {
            let textMap = "";
            for(let y=0; y < IslandMapping.length; y++) {
                for(let x=0; x < IslandMapping[y].length; x++) {
                    textMap += IslandMapping[y][x] == 1? '██': WHITESPACE+WHITESPACE;
                }
            }
        
            updateElement("islandView", {text: textMap});
        }
    }

    static Minimap = class InterfaceMinimap {
        static minimap = {
            'size'   : { 'x': 17, 'y': 21 },
            'mapping': [[]],
            'charmap': {
                'none'  : WHITESPACE,
                'player': '▲'
            }
        };

        static updateMinimap() {
            let textMap = "";
            for(let y=0; y < Interface.Minimap.minimap.mapping.length; y++) {
                for(let x=0; x < Interface.Minimap.minimap.mapping[y].length; x++) {
                    switch(Interface.Minimap.minimap.mapping[y][x]) {
                        case 0:
                            textMap += `[${Interface.Minimap.minimap.charmap.none}]`;
                            break;
                        default:
                            textMap += `[${Interface.Minimap.minimap.mapping[y][x]}]`;
                    }
                }
            }
            updateElement("minimap-cells", {text: textMap});
        }
        
        static startMinimap(playerX=Interface.Minimap.minimap.size.x/2, playerY=Interface.Minimap.minimap.size.y/2) {
            Interface.Minimap.minimap.mapping = new Array(Interface.Minimap.minimap.size.y).fill('')
                                        .map(_ => new Array(Interface.Minimap.minimap.size.x).fill(0));
    
            playerX = Math.ceil(playerX)*3 - 1;
            playerY = Math.ceil(playerY);
            updateElement('minimap-player', { text: Interface.Minimap.minimap.charmap.player, x: playerX, y: playerY }, false);
    
            Interface.Minimap.updateMinimap();
        }
    }
}