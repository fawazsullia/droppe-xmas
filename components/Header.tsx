import React from 'react';
import styles from './styles/Header.module.css'
import Link from 'next/link';

function Header() : JSX.Element {
  return <header className={styles.container}>
      <p><Link href="/">Droppe-Xmas</Link></p>
  </header>;
}

export default Header;
