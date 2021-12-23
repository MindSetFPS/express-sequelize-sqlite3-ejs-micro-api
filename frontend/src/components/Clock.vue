<template>

    <div class="flex" >
        <p>
            {{ hours }}:
        </p>
        <p>
            {{ minutes }}
        </p>
        {{ amPm }}
    </div>

</template>
<script>
function padZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}
const getDate = () => new Date();
const getSeconds = () => padZero(getDate().getSeconds());
const getMinutes = () => padZero(getDate().getMinutes());
const getHour = twelveHour => {
  let hours = getDate().getHours();
  if (twelveHour && hours > 12) {
    hours = hours - 12;
  }
  return padZero(hours);
};
const getAmPm = () => (getDate().getHours() > 12 ? "PM" : "AM");
export default {
  name: "vue-digital-clock",
  props: ["blink", "displaySeconds", "twelveHour"],
  data() {
    return {
      ticker: null,
      minutes: getMinutes(),
      hours: getHour(this.twelveHour),
      seconds: getSeconds(),
      amPm: getAmPm()
    };
  },
  created() {
    this.ticker = setInterval(() => {
      this.minutes = getMinutes();
      this.hours = getHour(this.twelveHour);
      this.seconds = getSeconds();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.ticker);
  }
};
</script>
<style scoped>
    p{@apply text-4xl font-medium}
</style>