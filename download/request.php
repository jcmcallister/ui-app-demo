<?php

  include 'randomterms.php';

  $configCount = 2; // we return the 2 given config objects as the first 2 results always, then randomly generate the others

  function getRandomConfig() {
    $cfg = array('id' => ++$GLOBALS['configCount'], 'name' => "host" . $GLOBALS['configCount'], 'hostname' => 'nessus-' . getRandomProtocol() . '.lab.com', 'port' => mt_rand(1000,9999), 'username' => getRandomTerm() );
    return $cfg;
  }

  header('Cache-Control: no-cache, must-revalidate');
  header('Content-type: application/json');
  if($_GET['host'] && is_numeric($_GET['host']) ) {
    $hostCount = $_GET['host'];

    if($hostCount > 100) {
      $hostCount = 100; // TODO: add a HostCountOffset to add to any enumerated properties/IDs when segmented data-fetches happen
    }

    if( isset($_GET['countfrom']) && $_GET['countfrom'] && is_numeric($_GET['countfrom']) ) {
      $GLOBALS['configCount'] = $_GET['countfrom'];
    }

    $one_config = array('id' => 1 ,'name' => "host1", 'hostname' => 'nessus-ntp.lab.com', 'port' => 1241, 'username' => 'toto');
    $two_config = array('id' => 2 ,'name' => "host2", 'hostname' => 'nessus-xml.lab.com', 'port' => 3384, 'username' => 'admin');

    $configs[0] = $one_config;
    $configs[1] = $two_config;

    for ($i=2; $i < $hostCount; $i++) {
      // we get random configs for each requested host, to simulate a datasource
      $configs[] = getRandomConfig();
    }

    $obj  = array('configurations' => $configs);
    echo json_encode($obj);
  }
?>
