function getRamdomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkWinner(playerHealth, monsterHealth) {
  console.log("Entered to checkwinner");
  if (playerHealth < 0 && monsterHealth < 0) {
    return "DRAW";
  } else if (monsterHealth <= 0 && playerHealth > 0) {
    return gameStatus = "YOU WIN";
  } else if (playerHealth <= 0 && monsterHealth > 0) {
    return gameStatus = "YOU LOSE";
  } else {
    return "Game contiunie";
  }
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      gameStatus: "Game contiunie",
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
      return this.currentRound % 3 !== 0;
    },
    getGameStatus() {
      return this.gameStatus;
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
      this.gameStatus = checkWinner(this.playerHealth, this.monsterHealth);
      console.log(`checkWinner: ${checkWinner(this.playerHealth, this.monsterHealth)}`);
      console.log(`gameStatus: ${this.gameStatus}`);
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
      this.gameStatus = checkWinner(this.playerHealth, this.monsterHealth);
      console.log(`checkWinner: ${checkWinner(this.playerHealth, this.monsterHealth)}`);
      console.log(`gameStatus: ${this.gameStatus}`);
    },
    healPlayer() {
      this.currentRound++;

      let healValue = getRamdomValue(8, 15);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer;
      this.gameStatus = checkWinner(this.playerHealth, this.monsterHealth);
      console.log(`checkWinner: ${checkWinner(this.playerHealth, this.monsterHealth)}`);
      console.log(`gameStatus: ${this.gameStatus}`);
    },
  },
});

app.mount("#game");
