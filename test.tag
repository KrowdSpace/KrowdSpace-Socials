<test>

    <h2>this is our test tag</h2>
    <ul each={ tweet in opts }>
       
        <li>{ tweet.text }</li>
    
    </ul>
    <!--<p id="tweets" each = { tweets }>{ title }</p>-->

    
    <script>
        console.log(opts);
    </script>
</test>