function getRamdomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      let onceAttackValue = getRamdomValue(5, 12);
      console.log(this.mandarin);
      this.monsterHealth -= onceAttackValue;
      console.log(
        `Player Attacked: / Monster Health: ${this.monsterHealth}`
      );
      this.attackPlayer();
      console.log(
        `Monster Attacked: / Player Health: ${this.playerHealth}`
      );
    },
    attackPlayer() {
      let monsterAttackValue = getRamdomValue(8, 15);
      this.playerHealth -= monsterAttackValue;
    },
  },
});

app.mount("#game");
