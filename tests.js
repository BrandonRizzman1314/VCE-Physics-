(function () {
  const U = 'm s<sup>−1</sup>', A = 'm s<sup>−2</sup>';
  const M = (tp, q, o, a, s) => ({ tp, q, o, a, s });
  const N = (tp, q, n, t, u, s) => ({ tp, q, n, t, u, s });
  window.TESTS = {
    newton: [
      N('1A', 'A car accelerates uniformly from rest to 27 ' + U + ' in 9.0 s. How far does it travel in this time?', 121.5, 1, 'm', 'No acceleration needed: s = ½(u + v)t = ½(0 + 27)(9.0) = 121.5 m (about 120 m).'),
      M('1A', 'On a velocity–time graph, the area between the line and the time axis represents:', ['Acceleration', 'Displacement', 'Speed', 'Force'], 1, 'Area = velocity × time = displacement. The slope gives the acceleration.'),
      M('1B', 'A 2.0 kg object has forces of 8.0 N east and 3.0 N west acting on it. What is its acceleration?', ['2.5 ' + A + ' east', '5.5 ' + A + ' east', '4.0 ' + A + ' east', 'Zero'], 0, 'F<sub>net</sub> = 8.0 − 3.0 = 5.0 N east. a = F ÷ m = 5.0 ÷ 2.0 = 2.5 ' + A + ' east.'),
      N('1B', 'A force of 60 N acts at 35° above the horizontal. What is the size of its vertical component?', 34.4, .3, 'N', 'F<sub>y</sub> = F sin θ = 60 sin 35° = 34.4 N.'),
      N('1C', 'A 3.0 kg block rests on a rough 40° slope without sliding. What is the friction force on it?', 18.9, .3, 'N', 'The block is in equilibrium, so friction = the down-slope component of weight = mg sin θ = (3.0)(9.8) sin 40° = 18.9 N.'),
      M('1C', 'A box slides down a frictionless 30° slope. What is its acceleration?', ['9.8 ' + A, '8.5 ' + A, '4.9 ' + A, '2.5 ' + A], 2, 'a = g sin θ = 9.8 sin 30° = 4.9 ' + A + '.'),
      N('1D', 'A 12 N force pulls a 2.0 kg trolley, which is joined by a rope to a 4.0 kg trolley behind it. The floor is smooth. What is the tension in the rope?', 8, .1, 'N', 'a = 12 ÷ 6.0 = 2.0 ' + A + '. The tension is the only horizontal force on the 4.0 kg trolley: T = ma = (4.0)(2.0) = 8.0 N.'),
      N('1D', 'A 3.0 kg block on a smooth table is joined over a pulley to a 1.0 kg hanging mass. What is the acceleration of the system?', 2.45, .05, A, 'a = m₂g ÷ (m₁ + m₂) = (1.0)(9.8) ÷ 4.0 = 2.45 ' + A + '.'),
      N('1E', 'A 0.40 kg ball on a string moves in a horizontal circle of radius 0.60 m at a speed of 3.0 ' + U + '. What is the tension in the string?', 6, .05, 'N', 'The tension provides the net force toward the centre: F = mv² ÷ r = (0.40)(3.0)² ÷ 0.60 = 6.0 N.'),
      M('1E', 'A car drives around a flat, circular bend. Which force provides the centripetal force?', ['The car’s weight', 'The normal force from the road', 'Friction between the tyres and the road', 'The engine force'], 2, 'On a flat road the only horizontal force on the car is friction, and it points toward the centre of the bend.'),
      N('1F', 'A bend of radius 150 m is banked at 10°. What is the design speed at which no friction is needed?', 16.1, .2, U, 'v = √(rg tan θ) = √(150 × 9.8 × tan 10°) = 16.1 ' + U + '.'),
      M('1F', 'A car takes a frictionless banked bend faster than the design speed. It will tend to:', ['Slide down the bank', 'Slide up the bank toward the outside', 'Stay in the same position', 'Speed up'], 1, 'The normal force alone cannot supply enough centripetal force, so the car tends to move outward, which is up the bank.'),
      N('sat', 'A satellite orbits at r = 1.0 × 10⁷ m from Earth’s centre. What is its orbital speed? (G = 6.67 × 10⁻¹¹ N m² kg⁻², M = 5.97 × 10²⁴ kg)', 6310, 30, U, 'v = √(GM ÷ r) = √(3.98 × 10¹⁴ ÷ 1.0 × 10⁷) = 6.31 × 10³ ' + U + '.'),
      M('sat', 'A satellite is moved to a higher circular orbit. Its period:', ['Decreases', 'Stays the same', 'Increases', 'Becomes zero'], 2, 'T² is proportional to r³, so a larger orbit has a longer period. The satellite also moves more slowly.'),
      N('1G', 'A 50 kg person travels at 12 ' + U + ' through the bottom of a dip of radius 30 m. What is the normal force on them?', 730, 2, 'N', 'N − mg = mv² ÷ r, so N = m(g + v²/r) = 50(9.8 + 144/30) = 730 N.'),
      N('1G', 'What is the minimum speed at the top of a vertical circle of radius 4.9 m for an object to stay in contact with the track?', 6.93, .05, U, 'At the minimum speed the normal force is zero, so v = √(gr) = √(9.8 × 4.9) = 6.93 ' + U + '.'),
      N('1H', 'A ball is thrown horizontally at 8.0 ' + U + ' from a cliff 45 m high. How far from the base of the cliff does it land?', 24.2, .3, 'm', 'Vertical: t = √(2h ÷ g) = √(90 ÷ 9.8) = 3.03 s. Horizontal: s = vt = (8.0)(3.03) = 24.2 m.'),
      M('1H', 'At the highest point of a projectile’s flight (ignoring air resistance), which statement is correct?', ['Velocity is zero and acceleration is zero', 'Velocity is horizontal and acceleration is 9.8 ' + A + ' downward', 'Velocity is horizontal and acceleration is zero', 'Velocity is vertical and acceleration is 9.8 ' + A + ' downward'], 1, 'Only the vertical component of velocity is zero at the top. The horizontal velocity is unchanged, and gravity still gives an acceleration of 9.8 ' + A + ' downward.')
    ],
    fem: [
      N('1I', 'A 0.060 kg tennis ball hits a racquet at 25 ' + U + ' and leaves in the opposite direction at 30 ' + U + '. The contact time is 0.010 s. What is the average force on the ball?', 330, 3, 'N', 'Δp = m(v − u) = 0.060(30 − (−25)) = 3.3 N s. F = Δp ÷ Δt = 3.3 ÷ 0.010 = 330 N.'),
      N('1I', 'A 1500 kg car travelling at 10 ' + U + ' collides with a stationary 500 kg car and they stick together. What is their velocity after the collision?', 7.5, .05, U, 'Momentum is conserved: (1500)(10) = (2000)v, so v = 7.5 ' + U + '.'),
      M('1I', 'A collision lasts longer because of a crumple zone, with the same change in momentum. The average force:', ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'], 1, 'FΔt = Δp is fixed. A larger Δt gives a smaller average force.'),
      N('1I', 'A 2.0 kg trolley at 3.0 ' + U + ' collides with a stationary 4.0 kg trolley. Afterward the 2.0 kg trolley moves back at 1.0 ' + U + '. What is the velocity of the 4.0 kg trolley?', 2, .05, U, 'Momentum before = (2.0)(3.0) = 6.0. After: 2.0(−1.0) + 4.0v = 6.0, so v = 2.0 ' + U + ' (in the original direction).'),
      N('work', 'A horizontal 15 N force pushes a box 4.0 m against a constant 5.0 N friction force. What is the net work done on the box?', 40, .5, 'J', 'F<sub>net</sub> = 15 − 5.0 = 10 N. W = F<sub>net</sub>s = (10)(4.0) = 40 J.'),
      N('work', 'A force rises steadily from 0 to 30 N over the first 2.0 m, then stays at 30 N for the next 3.0 m. What is the total work done?', 120, 1, 'J', 'Triangle: ½ × 2.0 × 30 = 30 J. Rectangle: 3.0 × 30 = 90 J. Total = 120 J.'),
      M('work', 'A person carries a heavy bag at constant velocity along a horizontal path. How much work does the upward force on the bag do?', ['A large positive amount', 'A large negative amount', 'Zero', 'It equals the weight × the distance'], 2, 'The upward force is perpendicular to the displacement, so it does no work.'),
      N('work', 'A net work of 25 J is done on a 0.50 kg ball that starts from rest. What is its final speed?', 10, .1, U, 'The net work equals the gain in kinetic energy: 25 = ½(0.50)v², so v = 10 ' + U + '.'),
      N('energy', 'A 0.80 kg mass falls through a height of 3.0 m. How much gravitational potential energy does it lose?', 23.5, .1, 'J', 'E<sub>g</sub> = mgΔh = (0.80)(9.8)(3.0) = 23.5 J.'),
      N('energy', 'A 2.0 kg trolley compresses a spring (k = 500 N m⁻¹) by 0.20 m before stopping momentarily. What was its initial speed?', 3.16, .05, U, 'Spring energy = ½kx² = ½(500)(0.20)² = 10 J. This equals the initial kinetic energy: ½(2.0)v² = 10, so v = 3.16 ' + U + '.'),
      M('energy', 'In which type of collision is kinetic energy conserved?', ['All collisions', 'Elastic collisions only', 'Inelastic collisions only', 'No collisions'], 1, 'Momentum is conserved in all collisions in an isolated system, but kinetic energy is conserved only in elastic ones.'),
      N('energy', 'A 60 kg skier starts from rest at the top of a 25 m high slope. 40% of the initial energy is dissipated by the bottom. What is the skier’s speed at the bottom?', 17.1, .1, U, 'The remaining 60% becomes kinetic energy: ½mv² = 0.60 mgh, so v = √(2 × 0.60 × 9.8 × 25) = 17.1 ' + U + '.')
    ]
  };
})();
