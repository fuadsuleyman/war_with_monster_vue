function getRamdomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
    disableStyle() {
      return this.currentRound % 3 !== 0
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      console.log(`remainder: ${this.currentRound % 3}`);
      let onceAttackValue = getRamdomValue(5, 12);
      this.monsterHealth -= onceAttackValue;
      console.log(`Player Attacked: / Monster Health: ${this.monsterHealth}`);
      this.attackPlayer();
      console.log(`Monster Attacked: / Player Health: ${this.playerHealth}`);
    },
    attackPlayer() {
      let monsterAttackValue = getRamdomValue(8, 15);
      this.playerHealth -= monsterAttackValue;
    },
    specialAttack() {
      this.currentRound++;
      console.log(`remainder: ${this.currentRound % 3}`);
      let specialAttackValue = getRamdomValue(10, 25);
      this.monsterHealth -= specialAttackValue;
      console.log(`Special Attacked: / Monster Health: ${this.monsterHealth}`);
      this.attackPlayer();
      console.log(`Monster Attacked: / Player Health: ${this.playerHealth}`);
    },
  },
});

app.mount("#game");
