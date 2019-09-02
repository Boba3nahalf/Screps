var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var HarvesterNeeded = 4, UpgraderNeeded = 2, BuilderNeeded = 2;
var Names = 0
module.exports.loop = function () {
    
    if(Names > 100)
    Names = 0;
    var HarvesterNum = 0, UpgraderNum = 0, BuilderNum = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            HarvesterNum++;
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            UpgraderNum++;
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            BuilderNum++;
        }
    }
    Names = HarvesterNum + UpgraderNum + BuilderNum + 1;
   
    
    for(var name in Game.spawns){
        var spawn = Game.spawns[name];
        if(spawn.energy >= 200)
        {
            if(HarvesterNeeded != HarvesterNum)
            spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester" + Names, {memory: {role: "harvester"}});
            else{
                if(BuilderNeeded > BuilderNum)
                spawn.spawnCreep([WORK, CARRY, MOVE], "Builder" + Names, {memory: {role: "builder"}});
                if(UpgraderNeeded > UpgraderNum)
                spawn.spawnCreep([WORK, CARRY, MOVE], "Upgrader" + Names, {memory: {role: "upgrader"}});
            }
            
        }
            
    }
}