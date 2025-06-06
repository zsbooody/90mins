// 获取DOM元素
const cycleClock = document.getElementById('cycle-clock');
const cycleCount = document.getElementById('cycle-count');

// 获取环形进度条元素（使用ID选择器）
const hoursRing = document.getElementById('hours-progress');
const minutesRing = document.getElementById('minutes-progress');
const secondsRing = document.getElementById('seconds-progress');

// 定义环形进度条周长
const HOURS_CIRCUMFERENCE = 565; // 2 * π * 90
const MINUTES_CIRCUMFERENCE = 691; // 2 * π * 110
const SECONDS_CIRCUMFERENCE = 817; // 2 * π * 130

// 初始化环形进度条
hoursRing.style.strokeDasharray = HOURS_CIRCUMFERENCE;
hoursRing.style.strokeDashoffset = HOURS_CIRCUMFERENCE;

minutesRing.style.strokeDasharray = MINUTES_CIRCUMFERENCE;
minutesRing.style.strokeDashoffset = MINUTES_CIRCUMFERENCE;

secondsRing.style.strokeDasharray = SECONDS_CIRCUMFERENCE;
secondsRing.style.strokeDashoffset = SECONDS_CIRCUMFERENCE;

// 更新时钟函数
function updateCycleClock() {
  const now = new Date();
  
  // 获取当天0点的时间戳
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  
  // 计算从0点开始的毫秒数
  const elapsedMs = now - startOfDay;
  
  // 转换为总秒数
  const totalSeconds = Math.floor(elapsedMs / 1000);
  
  // 计算周期数 (90分钟 = 5400秒)
  const cycleSeconds = 5400;
  const cycles = Math.floor(totalSeconds / cycleSeconds);
  
  // 计算当前周期内的秒数
  const currentCycleSeconds = totalSeconds % cycleSeconds;
  
  // 转换为小时:分钟:秒格式
  const hours = cycles; // 小时范围: 0-15
  const minutes = Math.floor(currentCycleSeconds / 60); // 分钟范围: 0-89
  const seconds = currentCycleSeconds % 60; // 秒范围: 0-59
  
  // 格式化时间显示
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  // 更新页面时间显示
  cycleClock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  cycleCount.textContent = hours;
  
  // 更新环形进度条
  updateProgressRings(hours, minutes, seconds, now);
}

// 更新环形进度条函数
function updateProgressRings(hours, minutes, seconds, now) {
  // 使用小数进度实现平滑动画
  const hoursProgress = hours / 15;
  const minutesProgress = minutes / 89;
  const secondsProgress = (seconds + now.getMilliseconds()/1000) / 60; // 分母改为60

  hoursRing.style.strokeDashoffset = HOURS_CIRCUMFERENCE * (1 - hoursProgress);
  minutesRing.style.strokeDashoffset = MINUTES_CIRCUMFERENCE * (1 - minutesProgress);
  secondsRing.style.strokeDashoffset = SECONDS_CIRCUMFERENCE * (1 - secondsProgress);
}

// 在updateCycleClock中传递now参数
// 在updateCycleClock中传递now参数
// 删除此行，避免未定义变量错误
// updateProgressRings(hours, minutes, seconds, now);

// 使用requestAnimationFrame实现平滑动画
function animate() {
  updateCycleClock();
  requestAnimationFrame(animate);
}

// 启动动画循环
animate();

// 初始更新
updateCycleClock();

// 删除 setInterval 避免冲突
// 每秒更新一次
// setInterval(updateCycleClock, 1000);