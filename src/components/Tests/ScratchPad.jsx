export function UseCard({ name, age }) {
  return `Hello ${name}, you are ${age} years old`;
}

export function Button({ text = 'Click me!', color = 'blue' }) {
  return <button style={(color = { color })}>{text}</button>;
}

export function Card({ title, subtitle, ...otherProps }) {
  const names = ['Larry', 'Curly', 'Moe'];
  const names2 = [...names, 'Shemp'];
  const buds = ['Cookie', 'Hotpants', 'Trevor', 'Cookie', 'Gardner', 'Cookie'];
  const noCookie = buds.filter((bud) => {
    return bud !== 'Cookie';
  });
  console.log(noCookie);

  return (
    <>
      <div {...otherProps}>{title}</div>
      <ul>
        {names2.map((name, i) => {
          return <li>{`The number ${i + 1} bozo is ${name}!`}</li>;
        })}
      </ul>
      <ul>{noCookie}</ul>

      <div>{subtitle}</div>
      {/* <div>{age > 10 ? 'Gary' : 'Baby Gary Jr'}</div>; */}
    </>
  );
}
