// generates user analytics based on expected ranges for result of facial image analysis
export default function generateFakeAnalytics(i) {
  const fakeAnalytics = {};
  fakeAnalytics.user_id = i;
  fakeAnalytics.age = Math.floor(Math.random() * (35 - 18)) + 18;
  fakeAnalytics.expression = Math.floor(Math.random() * (100 - 25)) + 25;
  fakeAnalytics.faceShape = Math.random() * 1.5;
  const races = ['asian', 'white', 'black'];
  fakeAnalytics.coloring = races[Math.floor(Math.random() * 3)];
  return fakeAnalytics;
}
